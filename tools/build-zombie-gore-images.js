// Genera las imágenes de Zombie Gore (hero 16:9 e icono) a partir de los assets del
// proyecto Unity. Uso: node tools/build-zombie-gore-images.js
const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

const SOURCE_ROOT = "C:/Users/cecas/Documents/GitLab/zombiegorefrontend/Assets/_Project/UI";
const OUTPUT_ROOT = path.join(__dirname, "..", "images", "projects");

function decodePng(file) {
    const buffer = fs.readFileSync(file);
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    const colorType = buffer[25];
    const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[colorType];
    if (!channels || buffer[24] !== 8 || buffer[28] !== 0) {
        throw new Error(`PNG no soportado: ${file}`);
    }

    const chunks = [];
    let offset = 8;
    while (offset < buffer.length) {
        const length = buffer.readUInt32BE(offset);
        const type = buffer.toString("ascii", offset + 4, offset + 8);
        if (type === "IDAT") chunks.push(buffer.subarray(offset + 8, offset + 8 + length));
        offset += length + 12;
    }

    const raw = zlib.inflateSync(Buffer.concat(chunks));
    const stride = width * channels;
    const pixels = Buffer.alloc(width * height * 4);
    let previous = Buffer.alloc(stride);

    for (let y = 0; y < height; y++) {
        const filter = raw[y * (stride + 1)];
        const line = Buffer.from(raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)));
        for (let i = 0; i < stride; i++) {
            const a = i >= channels ? line[i - channels] : 0;
            const b = previous[i];
            const c = i >= channels ? previous[i - channels] : 0;
            if (filter === 1) line[i] = (line[i] + a) & 0xff;
            else if (filter === 2) line[i] = (line[i] + b) & 0xff;
            else if (filter === 3) line[i] = (line[i] + ((a + b) >> 1)) & 0xff;
            else if (filter === 4) {
                const p = a + b - c;
                const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
                line[i] = (line[i] + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff;
            }
        }
        for (let x = 0; x < width; x++) {
            const src = x * channels;
            const dst = (y * width + x) * 4;
            if (channels >= 3) {
                pixels[dst] = line[src];
                pixels[dst + 1] = line[src + 1];
                pixels[dst + 2] = line[src + 2];
                pixels[dst + 3] = channels === 4 ? line[src + 3] : 255;
            } else {
                pixels[dst] = pixels[dst + 1] = pixels[dst + 2] = line[src];
                pixels[dst + 3] = channels === 2 ? line[src + 1] : 255;
            }
        }
        previous = line;
    }

    return { width, height, pixels };
}

function encodePng({ width, height, pixels }) {
    const stride = width * 4;
    const raw = Buffer.alloc((stride + 1) * height);
    for (let y = 0; y < height; y++) {
        raw[y * (stride + 1)] = 0;
        pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
    }

    const chunk = (type, data) => {
        const out = Buffer.alloc(data.length + 12);
        out.writeUInt32BE(data.length, 0);
        out.write(type, 4, "ascii");
        data.copy(out, 8);
        out.writeInt32BE(crc(out.subarray(4, 8 + data.length)), 8 + data.length);
        return out;
    };

    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(width, 0);
    ihdr.writeUInt32BE(height, 4);
    ihdr[8] = 8;
    ihdr[9] = 6;

    return Buffer.concat([
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        chunk("IHDR", ihdr),
        chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
        chunk("IEND", Buffer.alloc(0)),
    ]);
}

const CRC_TABLE = (() => {
    const table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        table[n] = c;
    }
    return table;
})();

function crc(buffer) {
    let c = -1;
    for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
    return c ^ -1;
}

// Recorta una región y la reescala con media de área (box filter).
function cropResize(image, sx, sy, sw, sh, dw, dh) {
    const pixels = Buffer.alloc(dw * dh * 4);
    for (let y = 0; y < dh; y++) {
        const y0 = sy + Math.floor((y * sh) / dh);
        const y1 = Math.max(y0 + 1, sy + Math.floor(((y + 1) * sh) / dh));
        for (let x = 0; x < dw; x++) {
            const x0 = sx + Math.floor((x * sw) / dw);
            const x1 = Math.max(x0 + 1, sx + Math.floor(((x + 1) * sw) / dw));
            let r = 0, g = 0, b = 0, a = 0, n = 0;
            for (let yy = y0; yy < y1; yy++) {
                for (let xx = x0; xx < x1; xx++) {
                    const i = (yy * image.width + xx) * 4;
                    r += image.pixels[i]; g += image.pixels[i + 1];
                    b += image.pixels[i + 2]; a += image.pixels[i + 3];
                    n++;
                }
            }
            const dst = (y * dw + x) * 4;
            pixels[dst] = r / n; pixels[dst + 1] = g / n;
            pixels[dst + 2] = b / n; pixels[dst + 3] = a / n;
        }
    }
    return { width: dw, height: dh, pixels };
}

function overlay(base, layer) {
    const pixels = Buffer.from(base.pixels);
    for (let i = 0; i < pixels.length; i += 4) {
        const alpha = layer.pixels[i + 3] / 255;
        if (alpha === 0) continue;
        for (let c = 0; c < 3; c++) {
            pixels[i + c] = layer.pixels[i + c] * alpha + pixels[i + c] * (1 - alpha);
        }
        pixels[i + 3] = 255;
    }
    return { width: base.width, height: base.height, pixels };
}

// Hero 16:9: franja del splash con el protagonista, la luna y los zombis.
const splash = decodePng(path.join(SOURCE_ROOT, "Icons/Main Splash Screen.png"));
const heroHeight = Math.round((splash.width * 9) / 16);
const hero = cropResize(splash, 0, 780, splash.width, heroHeight, 960, 540);
fs.writeFileSync(path.join(OUTPUT_ROOT, "zombie-gore.png"), encodePng(hero));

// Icono: composición de las capas del adaptive icon de Android, recortada a la
// zona visible (66% central del lienzo, como hace Google Play).
const background = decodePng(path.join(SOURCE_ROOT, "AdaptativeIcons/IconoAdaptativeAndroid_background.png"));
const foreground = decodePng(path.join(SOURCE_ROOT, "AdaptativeIcons/IconoAdaptativeAndroid_foreground.png"));
const composed = overlay(background, foreground);
const safe = Math.round(composed.width * 0.667);
const inset = Math.round((composed.width - safe) / 2);
const icon = cropResize(composed, inset, inset, safe, safe, 256, 256);
fs.writeFileSync(path.join(OUTPUT_ROOT, "zombie-gore-icon.png"), encodePng(icon));

console.log("Generadas zombie-gore.png (960x540) y zombie-gore-icon.png (256x256)");
