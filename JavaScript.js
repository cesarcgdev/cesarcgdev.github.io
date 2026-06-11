// Variable global para poder llamar a la traducción desde otros bloques de código
let updateTranslationsGlobal = null;

// Cambiar de idioma a inglés o español
document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("lang-select");

    // Función asíncrona para cargar el archivo JSON externo
    async function changeLanguage(lang) {
        try {
            // Hacemos la petición al archivo JSON correspondiente
            const response = await fetch(`../lang/${lang}.json`);
            
            if (!response.ok) {
                throw new Error(`No se pudo cargar el idioma: ${lang}`);
            }

            const translations = await response.json();
            const elementsToTranslate = document.querySelectorAll("[data-i18n]");
            
            // Recorremos los elementos del HTML e inyectamos los textos del JSON
            elementsToTranslate.forEach(element => {
                const key = element.getAttribute("data-i18n");
                if (translations[key]) {
                    element.innerHTML = translations[key];
                }
            });

            // Guardamos la elección y actualizamos el select
            localStorage.setItem("language", lang);
            if (langSelect) langSelect.value = lang;

        } catch (error) {
            console.error("Error cargando las traducciones:", error);
        }
    }

    // Guardamos una referencia global de la función para usarla en el bloque de proyectos
    updateTranslationsGlobal = () => {
        const savedLang = localStorage.getItem("language") || "es";
        changeLanguage(savedLang);
    };

    // Listener del selector de idiomas
    if (langSelect) {
        langSelect.addEventListener("change", (e) => {
            changeLanguage(e.target.value);
        });
    }

    // Inicializar con el idioma guardado o por defecto 'es'
    const savedLang = localStorage.getItem("language") || "es";
    changeLanguage(savedLang);
});

// Bloque que gestiona el funcionamiento de las cartas en la sección 'proyectos'
document.addEventListener("DOMContentLoaded", () => {
    const readMoreButtons = document.querySelectorAll(".btn-read-more");

    readMoreButtons.forEach(button => {
        button.addEventListener("click", function() {
            const card = this.closest(".project-card");
            const extraText = card.querySelector(".proyect-text-extra");
            const dots = card.querySelector(".dots");

            if (extraText) {
                const isExpanding = !extraText.classList.contains("expanded");
                
                if (isExpanding) {
                    // Ocultamos los puntos visualmente
                    if (dots) dots.style.display = "none";
                    
                    // Activamos el texto en el flujo inline
                    extraText.style.display = "inline";
                    
                    // Mini-retraso para activar el Fade In difuminado suave
                    setTimeout(() => {
                        extraText.classList.add("expanded");
                    }, 20);
                    
                    // Cambiamos la clave del atributo al estado "less" (Leer menos)
                    const lessKey = this.getAttribute("data-text-less") || "less";
                    this.setAttribute("data-i18n", lessKey);
                } else {
                    // Quitamos animación visual
                    extraText.classList.remove("expanded");
                    
                    // Cambiamos la clave del atributo de vuelta al estado "more"
                    const moreKey = this.getAttribute("data-text-more") || "more";
                    this.setAttribute("data-i18n", moreKey);

                    // Esperamos los 400ms de la transición para colapsar el espacio
                    setTimeout(() => {
                        extraText.style.display = "none";
                        if (dots) dots.style.display = "inline";
                    }, 40);
                }

                // Si la función de traducción global está lista, forzamos la actualización del botón
                if (typeof updateTranslationsGlobal === "function") {
                    updateTranslationsGlobal();
                }
            }
        });
    });
});

// Administra la edad actual que tengo
document.addEventListener("DOMContentLoaded", () => {
    // 3 porque los meses van de 0 a 11
    const birthDate = new Date(2001, 3, 27);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
    
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }
    
    // Inyectamos el número automáticamente en el HTML
    const ageSpan = document.getElementById("age");
    if (ageSpan) {
        ageSpan.textContent = age;
    }
});

// Implementa el modo claro u oscuro según preferencia
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;
    
    // Comprobar si el usuario ya tenía una preferencia guardada
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
 
    // Si el tema es dark, el checkbox debe estar marcado
    // Si el tema es light, debe estar desmarcado
    themeToggle.checked = (savedTheme === "dark");

    // Escuchar el clic en el botón de claro/oscuro
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        let newTheme = "light";

        if (currentTheme === "light") {
            newTheme = "dark";
        }

        // Aplicamos el nuevo tema al HTML
        document.documentElement.setAttribute("data-theme", newTheme);
        // Guardamos la elección para que no se pierda al recargar la página
        localStorage.setItem("theme", newTheme);
    });
});

// Administra el sistema de cambio de Paleta de Colores Dinámico
document.addEventListener("DOMContentLoaded", () => {
    const paletteSelect = document.getElementById("palette-select");
    if (!paletteSelect) return;

    // Cargar la paleta guardada del localStorage
    const savedPalette = localStorage.getItem("palette") || "original";
    document.documentElement.setAttribute("data-palette", savedPalette);
    paletteSelect.value = savedPalette;

    // Escuchar los cambios en el menú desplegable
    paletteSelect.addEventListener("change", (e) => {
        const selectedPalette = e.target.value;
        
        // Aplicamos el atributo data-palette a la raíz del HTML
        document.documentElement.setAttribute("data-palette", selectedPalette);
        
        // Guardamos la configuración en la memoria del navegador
        localStorage.setItem("palette", selectedPalette);
    });
});

// Lógica para la animación de aparición al hacer Scroll
function initScrollAnimations() {
    const sections = document.querySelectorAll('.fade-in-section');

    const options = {
        root: null,
        rootMargin: '0px 0px -80px 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar animaciones de scroll
    initScrollAnimations();
});