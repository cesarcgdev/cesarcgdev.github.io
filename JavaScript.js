// Variable global para poder llamar a la traducción desde otros bloques de código
let updateTranslationsGlobal = null;

// Cambiar de idioma a inglés o español
document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("lang-select");

    // Diccionario de traducciones local para evitar problemas de CORS al abrir localmente con protocolo file://
    const localTranslations = {
        es: {
            "nav-home": "Inicio",
            "nav-projects": "Proyectos",
            "nav-cv": "Mi perfil",
            "nav-contact": "Contacto",
            "forest-theme": "Bosque",
            "gold-theme": "Oro Real",
            "hero-title": "César<br>Castellano García",
            "hero-subtitle": "Programador Full Stack / Diseñador y Desarrollador de Videojuegos",
            "about-me-title": "SOBRE MÍ",
            "hero-desc": "Experto especializado en varias arquitecturas, siendo una persona <b>autodidacta</b> para cualquier tipo de tarea y <b>flexible</b> para adaptarme a todas las metodologías de trabajo. Acostumbrado a aprender de forma rápida y eficaz nuevas tecnologías, permitiendo <b>crear un progreso real</b> dentro de cualquier proyecto.<br>Cuando hay un problema, automáticamente busco la solución. Destaco por ser <b>comunicativo</b>, creando un <b>ambiente fluido y cómodo</b> de trabajo. Mi carrera y mis proyectos respaldan mis aptitudes.",
            "propertie-title-1": "Edad",
            "propertie-1": "años",
            "propertie-title-2": "Ubicación",
            "propertie-title-3": "Idiomas",
            "propertie-3a": "Español nativo",
            "propertie-3b": "Inglés B1",
            "propertie-title-4": "Otros",
            "propertie-4a": "Carnet de conducir B / vehículo propio",
            "propertie-4b": "Vehículo propio",
            "cv-title": "PERFIL PROFESIONAL",
            "trayectory-text": "Trayectoria",
            "experience-text": "Experiencia",
            "education-text": "Formación",
            "skills-subtitle": "Habilidades",
            "skill-teamwork": "<i class=\"fa-regular fa-handshake fa-fw\"></i> Trabajo en equipo",
            "skill-self": "<i class=\"fa-regular fa-lightbulb fa-fw\"></i> Autodidacta y resolutivo",
            "skill-responsible": "<i class=\"fa-regular fa-circle-check fa-fw\"></i> Responsable y comprometido",
            "skill-constancy": "<i class=\"fa-regular fa-clock fa-fw\"></i> Constancia",
            "skill-organized": "<i class=\"fa-regular fa-calendar-check fa-fw\"></i> Organizado y atento",
            "skill-pressure": "<i class=\"fa-regular fa-compass fa-fw\"></i> Trabajo bajo presión",
            "edu1-date": "Octubre 2023 - Diciembre 2025",
            "edu1-title": "Máster en Diseño y Desarrollo de Videojuegos",
            "edu1-bullet1": "Formación especializada en todas las áreas del desarrollo de los videojuegos.",
            "edu1-bullet2": "Método autodidacta con ensayo y error.",
            "edu1-bullet3": "Presencia activa en eventos como Game-Jams con varios equipos multidisciplinares.",
            "edu2-date": "Octubre 2021 - Febrero 2023",
            "edu2-title": "Grado Superior en Animación 3D, Juegos y Entornos Interactivos",
            "edu2-bullet1": "Aprendizaje para generar y adaptar cualquier proyecto multimedia al mercado.",
            "edu2-bullet2": "Generación de escenarios interactivos, así como la optimización de los mismos.",
            "edu2-bullet3": "Desarrollo de aplicaciones interactivas y entornos webs dinámicos.",
            "edu3-date": "Septiembre 2019 - Febrero 2021",
            "edu3-title": "Grado Superior en Administración de Sistemas Informáticos y Redes (A.S.I.R.)",
            "edu3-bullet1": "Planificación y construcción de infraestructuras tecnológicas, redes y servidores.",
            "edu3-bullet2": "Creación y desarrollo de usuarios y de sistemas operativos como Windows o Linux.",
            "edu3-bullet3": "Gestión de Base de Datos relacionales, con técnicas para proteger la información.",
            "exp1-title": "Diseñador y programador de Unity | Co-fundador de <i><a href='https://linktr.ee/DrilleStudio' class='extra-link' target='_blank'>Drille Studio</a></i>",
            "exp1-date": "Febrero 2025 - Presente",
            "exp1-bullet1": "Coordiné y lideré un <b>equipo multidisciplinar</b>, diseñando e implementando metodologías ágiles a través de <i>Trello</i> para garantizar un flujo de trabajo eficiente, flexible y adaptado a las necesidades del proyecto.",
            "exp1-bullet2": "Diseñé e implementé <b>mecánicas y sistemas complejos</b> aplicando patrones de diseño y prácticas de <b>programación limpia (Clean Code)</b> de gran eficiencia.",
            "exp1-bullet3": "Investigué y adopté nuevas <b>tecnologías emergentes</b>, asegurando la competitividad del stack técnico según las <b>demandas actuales</b> del mercado.",
            "exp1-bullet4": "Gestioné el flujo de trabajo y la integración del código mediante el <b>control de versiones con <i>Git</i></b>, garantizando la estabilidad de las ramas del proyecto.",
            "exp1-bullet5": "Realicé tareas de <b>depuración y refactorización de código</b>, logrando mejorar el rendimiento de los proyectos en hasta un 75%.",
            "exp2-title": "Programador en <i>Warlands Realms</i>",
            "exp2-date": "Febrero 2025 - Mayo 2025",
            "exp2-bullet1": "Investigué y solucioné <b>bugs heredados de meses de antigüedad</b>, optimizando la velocidad del sistema y acelerando el flujo de desarrollo general del proyecto.",
            "exp2-bullet2": "Adquirí experiencia sólida coordinando <b>arquitecturas complejas</b> junto a un equipo de <b>desarrolladores senior</b>, adaptándome a los estándares de proyectos de alto impacto.",
            "exp2-bullet3": "Lideré sesiones de <b>testing crítico</b> para identificar <b>cuellos de botella y vulnerabilidades</b>, liberando carga de trabajo al equipo técnico para que se enfocara en el core del negocio.",
            "exp2-bullet4": "Evalué, analicé e implanté <b>nuevas tecnologías y herramientas</b> en el ecosistema del proyecto, garantizando decisiones técnicas escalables y eficientes a largo plazo.",
            "exp2-bullet5": "Participé activamente en <b>reuniones diarias (Daily Stands)</b> para la priorización de <b>tareas críticas</b>, asegurando un avance continuo y alineado con los objetivos de entrega.",
            "exp3-title": "Desarrollador web y generalista 3D | <i>Psicosoft</i>",
            "exp3-date": "Febrero 2023 - Mayo 2023",
            "exp3-bullet1": "Apliqué <b>soluciones técnicas</b> avanzadas para el despliegue de <b>entornos web dinámicos, interactivos y escalables.</b>",
            "exp3-bullet2": "Traduje <b>modelos gráficos complejos</b> y guías de <b>estilo corporativo</b> en interfaces web reales utilizando <i>HTML5</i> y <i>CSS3</i> moderno, garantizando una alta fidelidad de diseño para los clientes.",
            "exp3-bullet3": "Implementé estrategias de <b>optimización de carga</b> y rendimiento de código, transformando portales web en plataformas fluidas, funcionales y centradas en la <b>experiencia de usuario (UX).</b>",
            "exp3-bullet4": "Participé en reuniones diarias orientadas al <b>seguimiento de objetivos</b>, diagnóstico temprano de bloqueos e ideación de nuevas funcionalidades para los proyectos activos.",
            "exp4-title": "Desarrollador de Software y Soluciones online | <i>ACAAO</i>",
            "exp4-date": "Marzo 2021 - Septiembre 2021",
            "exp4-bullet1": "Diseñé y estructuré <b>soluciones de software</b> con un programa interno personalizado y a medida, alineando la <b>arquitectura técnica</b> directamente con los objetivos de negocio y los requisitos específicos de cada cliente.",
            "exp4-bullet2": "Incrementé el <b>posicionamiento orgánico</b> y el rendimiento de plataformas web aplicando técnicas avanzadas de <b>optimización de carga, estructura de código, análisis de datos y palabras clave.</b>",
            "exp4-bullet3": "Diagnosticé y resolví <b>incidencias críticas</b>, tanto técnicas como funcionales, asegurando la alta disponibilidad del sistema y garantizando un servicio de soporte excelente.",
            "projects-title": "MIS PROYECTOS",
            "p1-desc-intro": "Shooter de plataformas 2.5D desarrollado en Unity donde ejercí como líder técnico en mi equipo <i><a href='https://linktr.ee/DrilleStudio' class='extra-link' target='_blank'>Drille Studio</a></i>.",
            "p1-desc-extra": " Diseñé la metodología de trabajo orientada a objetivos e integré los flujos de los distintos departamentos, asegurando una entrega exitosa y optimizando la productividad general.<br><br>Asimismo, diseñé y desarrollé la arquitectura técnica global, incluyendo sistemas dinámicos de apuntado, mecánicas de obstáculos e inteligencia artificial avanzada para enemigos y jefes finales. El proyecto concluyó con una fase intensiva de depuración que elevó drásticamente el rendimiento del producto.",
            "p2-desc-intro": "Videojuego de puzzles 3D programado en C# y desarrollado por un equipo multidisciplinar de 8 profesionales.",
            "p2-desc-extra": " El proyecto demostró un alto nivel competitivo, logrando posicionarse con éxito entre los 8 videojuegos más destacados de la <a href='https://itch.io/jam/cultura-abierta-6-edicin' class='extra-link' target='_blank'>VI Game Jam Cultura Abierta.</a><br><br>Mi rol se centró en la ingeniería de software, desarrollando el sistema de físicas del personaje, la interacción lógica con el entorno y una sala de exposición dinámica con recompensas desbloqueables. Todo el código base fue refactorizado para garantizar una experiencia fluida y optimizada.",
            "p3-desc-intro": "Twin Stick Shooter 3D de supervivencia por oleadas desarrollado íntegramente de forma autodidacta.",
            "p3-desc-extra": " Este proyecto técnico individual me permitió gestionar de manera autónoma todo el ciclo de vida del software, desde la conceptualización de las mecánicas core hasta la dirección de arte y el despliegue del juego.<br><br>Durante el desarrollo, implementé sistemas avanzados de persistencia de datos orientados a logros y un árbol de habilidades con tienda integrada. El resultado es una experiencia audiovisual interactiva con mecánicas pulidas que consolidó mis competencias en la arquitectura de sistemas en Unity.",
            "p1-badge": "Líder Técnico",
            "p1-tag3": "Metodología Agil",
            "p2-badge": "Top 8 Finalista",
            "p2-tag2": "Físicas 3D",
            "p2-tag3": "Optimización",
            "p3-badge": "Desarrollo Individual",
            "p3-tag2": "Persistencia de Datos",
            "p3-tag3": "Arquitectura de Sistemas",
            "more": "Leer más…",
            "less": "Leer menos",
            "trailer-text": "Tráiler",
            "official-page": "Página oficial",
            "contact-title": "CONTACTO",
            "contact-card-title": "Información",
            "label-email": "Correo",
            "label-phone": "Teléfono",
            "label-location": "Ubicación",
            "socials-label": "Mis redes profesionales:",
            "mail-text": "<i class=\"fa-regular fa-envelope fa-fw\"></i> Correo: ",
            "phone-text": "<i class=\"fa-regular fa-comment-dots fa-fw\"></i> Teléfono: ",
            "location-text": "<i class=\"fa-regular fa-compass fa-fw\"></i> Ubicación: ",
            "socials-text": "<i class=\"fa-regular fa-share-from-square fa-fw\"></i> Mis redes profesionales: ",
            "status-hiring": " Buscando empleo",
            "hiring-status-text": "Actualmente buscando empleo",
            "hiring-btn-text": "Agendar reunión",
            "status-hours": "Jornada <b>completa / parcial.</b>",
            "status-location": "<b>Remoto / Presencial</b> (Las Palmas de Gran Canaria).",
            "status-travel": "Disponibilidad para <b>desplazamientos puntuales.</b>",
            "skill-details-placeholder": "Pasa el ratón o pulsa sobre una habilidad para ver detalles",
            "skill-name-unity": "Unity",
            "skill-desc-unity": "Desarrollo de mecánicas complejas, físicas y optimización en entornos 3D y 2.5D.",
            "skill-name-csharp": "C#",
            "skill-desc-csharp": "Programación orientada a objetos, patrones de diseño y desarrollo de sistemas limpios (Clean Code).",
            "skill-name-blender": "Blender",
            "skill-desc-blender": "Modelado 3D, texturizado, rigging y optimización de recursos para videojuegos.",
            "skill-name-photoshop": "Adobe Photoshop",
            "skill-desc-photoshop": "Edición de texturas, retoque de materiales y diseño básico de interfaces (UI).",
            "skill-name-html": "HTML5",
            "skill-desc-html": "Estructuración semántica de páginas web y optimización SEO básica.",
            "skill-name-css": "CSS3",
            "skill-desc-css": "Diseño responsivo, maquetación moderna (Flexbox/Grid) y animaciones fluidas.",
            "skill-name-js": "JavaScript",
            "skill-desc-js": "Programación interactiva frontend, gestión del DOM y consumo de servicios web.",
            "skill-name-vscode": "Visual Studio Code",
            "skill-desc-vscode": "Entorno principal de desarrollo altamente optimizado mediante atajos y extensiones.",
            "skill-name-git": "Git",
            "skill-desc-git": "Control de versiones distribuido, control de ramas y fusión de código eficiente.",
            "skill-name-github": "GitHub",
            "skill-desc-github": "Gestión de repositorios colaborativos, Pull Requests y Code Reviews.",
            "skill-name-gitlab": "GitLab",
            "skill-desc-gitlab": "Integración y despliegue continuo (CI/CD) adaptado a entornos profesionales.",
            "skill-name-sourcetree": "SourceTree",
            "skill-desc-sourcetree": "Gestión visual e interactiva de flujos de trabajo avanzados en Git.",
            "skill-name-trello": "Trello",
            "skill-desc-trello": "Planificación ágil de proyectos mediante tableros dinámicos Kanban y Scrum.",
            "skill-name-windows": "Windows",
            "skill-desc-windows": "Administración de sistemas operativos y scripting nativo para automatizaciones.",
            "skill-name-ubuntu": "Ubuntu / Linux",
            "skill-desc-ubuntu": "Configuración de servidores dedicados y despliegues web mediante línea de comandos.",
            "skill-name-premiere": "Adobe Premiere Pro",
            "level-very-high": "MUY ALTO",
            "level-high": "ALTO",
            "cal-title": "Reunión / Entrevista Técnica",
            "cal-description": "¿Quieres agendar una reunión o entrevista técnica conmigo? Elige una fecha y la hora que mejor te convenga para charlar de tus proyectos o vacantes.",
            "cal-location-type": "Google Meet / Discord / Teams",
            "cal-timezone": "Europa/Madrid (UTC+1)",
            "cal-success-title": "¡Reunión Pre-agendada!",
            "cal-success-body": "Se ha abierto tu cliente de correo para enviar la confirmación. ¡Hablamos pronto!",
            "cal-confirm": "Confirmar",
            "cal-close": "Cerrar",
            "cal-select-day": "Selecciona un día",
            "cal-selected-prefix": "Horas para el",
            "footer-text": "&copy; 2026 César Castellano García | Las Palmas",
            "day-sun": "DOM",
            "day-mon": "LUN",
            "day-tue": "MAR",
            "day-wed": "MIE",
            "day-thu": "JUE",
            "day-fri": "VIE",
            "day-sat": "SAB"
        },
        en: {
            "nav-home": "Home",
            "nav-projects": "Projects",
            "nav-cv": "Mi perfil",
            "nav-contact": "Contact",
            "forest-theme": "Forest",
            "gold-theme": "Real Gold",
            "hero-title": "César<br>Castellano García",
            "hero-subtitle": "Full Stack Developer / Game Designer & Developer",
            "about-me-title": "ABOUT ME",
            "hero-desc": "Expert specialized in multiple architectures, being a <b>self-taught</b> individual for any task and <b>flexible</b> to adapt to all work methodologies. Accustomed to learning new technologies quickly and effectively, allowing to <b>create real progress</b> within any project.<br>When a problem arises, I automatically seek the solution. I stand out for being <b>communicative</b>, creating a <b>fluid and comfortable</b> work environment. My career and projects back my skills.",
            "propertie-title-1": "Age",
            "propertie-1": "years old",
            "propertie-title-2": "Location",
            "propertie-title-3": "Languages",
            "propertie-3a": "Native spanish",
            "propertie-3b": "B1 English",
            "propertie-title-4": "Others",
            "propertie-4a": "Driver's license (B) / own vehicle",
            "propertie-4b": "Own vehicle",
            "cv-title": "PROFESSIONAL PROFILE",
            "trayectory-text": "Professional Journey",
            "experience-text": "Work Experience",
            "education-text": "Education",
            "skills-subtitle": "Skills",
            "skill-teamwork": "<i class=\"fa-regular fa-handshake fa-fw\"></i> Teamplayer",
            "skill-self": "<i class=\"fa-regular fa-lightbulb fa-fw\"></i> Self-taught & decisive",
            "skill-responsible": "<i class=\"fa-regular fa-circle-check fa-fw\"></i> Responsible & committed",
            "skill-constancy": "<i class=\"fa-regular fa-clock fa-fw\"></i> Persistent",
            "skill-organized": "<i class=\"fa-regular fa-calendar-check fa-fw\"></i> Organized & attentive",
            "skill-pressure": "<i class=\"fa-regular fa-compass fa-fw\"></i> Work under pressure",
            "edu1-date": "October 2023 - December 2025",
            "edu1-title": "Master's Degree in Game Design and Development",
            "edu1-bullet1": "Specialized training across all areas of video game development.",
            "edu1-bullet2": "Self-taught methodology based on trial and error.",
            "edu1-bullet3": "Active presence in Game Jams working with several multidisciplinary teams.",
            "edu2-date": "October 2021 - February 2023",
            "edu2-title": "Higher Degree in 3D Animation, Games and Interactive Environments",
            "edu2-bullet1": "Learning to generate and adapt any multimedia project for the market.",
            "edu2-bullet2": "Creation of interactive environments, as well as their optimization.",
            "edu2-bullet3": "Development of interactive applications and dynamic web environments.",
            "edu3-date": "September 2019 - February 2021",
            "edu3-title": "Higher Degree in Network Computer Systems Administration (A.S.I.R.)",
            "edu3-bullet1": "Planning and construction of technological infrastructures, networks, and servers.",
            "edu3-bullet2": "Creation and development of users and operating systems such as Windows or Linux.",
            "edu3-bullet3": "Management of relational databases with techniques to protect information.",
            "exp1-title": "Unity Designer and Programmer | Co-founder of <i><a href='https://linktr.ee/DrilleStudio' class='extra-link' target='_blank'>Drille Studio</a></i>",
            "exp1-date": "February 2025 - Present",
            "exp1-bullet1": "Coordinated and led a <b>multidisciplinary team</b>, designing and implementing agile methodologies via <i>Trello</i> to ensure an efficient, flexible workflow tailored to project needs.",
            "exp1-bullet2": "Designed and implemented <b>complex mechanics and systems</b> applying design patterns and highly efficient <b>Clean Code</b> practices.",
            "exp1-bullet3": "Researched and adopted new <b>emerging technologies</b>, ensuring the competitiveness of the technical stack according to current market <b>demands</b>.",
            "exp1-bullet4": "Managed workflow and code integration through <b>version control with <i>Git</i></b>, ensuring the stability of project branches.",
            "exp1-bullet5": "Performed <b>debugging and code refactoring</b> tasks, successfully improving project performance by up to 75%.",
            "exp2-title": "Programmer at <i>Warlands Realms</i>",
            "exp2-date": "February 2025 - May 2025",
            "exp2-bullet1": "Researched and resolved <b>months-old legacy bugs</b>, optimizing system speed and accelerating the overall project development workflow.",
            "exp2-bullet2": "Gained solid experience coordinating <b>complex architectures</b> alongside a team of <b>senior developers</b>, adapting to high-impact project standards.",
            "exp2-bullet3": "Led critical <b>testing sessions</b> to identify <b>bottlenecks and vulnerabilities</b>, offloading workload from the technical team so they could focus on the core business.",
            "exp2-bullet4": "Evaluated, analyzed, and implemented <b>new technologies and tools</b> within the project ecosystem, ensuring scalable and efficient long-term technical decisions.",
            "exp2-bullet5": "Actively participated in <b>daily meetings (Daily Stands)</b> to prioritize <b>critical tasks</b>, ensuring continuous progress aligned with delivery goals.",
            "exp3-title": "Web Developer & 3D Generalist | <i>Psicosoft</i>",
            "exp3-date": "February 2023 - May 2023",
            "exp3-bullet1": "Applied advanced <b>technical solutions</b> for the deployment of <b>dynamic, interactive, and scalable web environments.</b>",
            "exp3-bullet2": "Translated <b>complex graphical models</b> and <b>corporate style</b> guides into real web interfaces using modern <i>HTML5</i> and <i>CSS3</i>, guaranteeing high design fidelity for clients.",
            "exp3-bullet3": "Implemented <b>load optimization</b> and code performance strategies, transforming web portals into smooth, functional platforms focused on <b>user experience (UX).</b>",
            "exp3-bullet4": "Participated in daily meetings oriented to <b>goal tracking</b>, early blockage diagnosis, and ideation of new functionalities for active projects.",
            "exp4-title": "Software & Online Solutions Developer | <i>ACAAO</i>",
            "exp4-date": "March 2021 - June 2021",
            "exp4-bullet1": "Designed and structured <b>software solutions</b> using a custom-tailored internal program, directly aligning the <b>technical architecture</b> with business goals and specific requirements of each client.",
            "exp4-bullet2": "Increased <b>organic positioning</b> and web platform performance by applying advanced techniques of <b>load optimization, code structure, data analysis, and keywords.</b>",
            "exp4-bullet3": "Diagnosed and resolved <b>critical incidents</b>, both technical and functional, ensuring high system availability and guaranteeing an excellent support service.",
            "projects-title": "MY PROJECTS",
            "p1-desc-intro": "2.5D platformer shooter developed in Unity where I acted as technical leader in my team <a href='https://linktr.ee/DrilleStudio' class='extra-link' target='_blank'><i>Drille Studio</i></a>.",
            "p1-desc-extra": " I designed the goal-oriented work methodology and integrated the workflows of the different departments, ensuring a successful delivery and optimizing overall productivity.<br>Likewise, I designed and developed the global technical architecture, including dynamic aiming systems, obstacle mechanics, and advanced artificial intelligence for enemies and final bosses. The project concluded with an intensive debugging phase that drastically boosted product performance.",
            "p2-desc-intro": "3D puzzle video game programmed in C# and developed by a multidisciplinary team of 8 professionals.",
            "p2-desc-extra": " The project demonstrated a high competitive level, successfully positioning itself among the top 8 standout video games of the <a href='https://itch.io/jam/cultura-abierta-6-edicin' class='extra-link' target='_blank'>VI Cultura Abierta Game Jam.</a><br><br>My role focused on software engineering, developing the character's physics system, logical environment interaction, and a dynamic exhibition room with unlockable rewards. The entire codebase was refactored to ensure a smooth and optimized experience.",
            "p3-desc-intro": "3D wave-based survival Twin-Stick Shooter developed entirely in a self-taught manner.",
            "p3-desc-extra": " This individual technical project allowed me to autonomously manage the entire software lifecycle, from conceptualizing core mechanics to art direction and game deployment.<br><br>During development, I implemented advanced data persistence systems focused on achievements and a skill tree with an integrated shop. The result is an interactive audiovisual experience with polished mechanics that consolidated my expertise in Unity systems architecture.",
            "p1-badge": "Technical Lead",
            "p1-tag3": "Agile Scrum",
            "p2-badge": "Top 8 Finalist",
            "p2-tag2": "3D Physics",
            "p2-tag3": "Optimization",
            "p3-badge": "Solo Development",
            "p3-tag2": "Data Persistence",
            "p3-tag3": "Systems Architecture",
            "more": "Read more…",
            "less": "Read less",
            "trailer-text": "Trailer",
            "official-page": "Official Web",
            "contact-title": "CONTACT",
            "contact-card-title": "Information",
            "label-email": "Email",
            "label-phone": "Phone",
            "label-location": "Location",
            "socials-label": "My professional networks:",
            "mail-text": "<i class=\"fa-regular fa-envelope fa-fw\"></i> Mail: ",
            "phone-text": "<i class=\"fa-regular fa-comment-dots fa-fw\"></i> Phone number: ",
            "location-text": "<i class=\"fa-regular fa-compass fa-fw\"></i> Location: ",
            "socials-text": "<i class=\"fa-regular fa-share-from-square fa-fw\"></i> My professional networks: ",
            "status-hiring": " Open to work",
            "hiring-status-text": "Currently open to work",
            "hiring-btn-text": "Book a meeting",
            "status-hours": "<b>Full-time / Part-time.</b>",
            "status-location": "<b>Remote / On-site</b> (Las Palmas de Gran Canaria).",
            "status-travel": "Available for <b>occasional travel.</b>",
            "skill-details-placeholder": "Hover or tap on a skill to see details",
            "skill-name-unity": "Unity",
            "skill-desc-unity": "Development of complex mechanics, physics, and optimization in 3D and 2.5D environments.",
            "skill-name-csharp": "C#",
            "skill-desc-csharp": "Object-oriented programming, design patterns, and writing Clean Code systems.",
            "skill-name-blender": "Blender",
            "skill-desc-blender": "3D modeling, texturing, rigging, and asset optimization for video games.",
            "skill-name-photoshop": "Adobe Photoshop",
            "skill-desc-photoshop": "Texture editing, material retouching, and basic user interface (UI) design.",
            "skill-name-html": "HTML5",
            "skill-desc-html": "Semantic web structuring and basic search engine optimization (SEO).",
            "skill-name-css": "CSS3",
            "skill-desc-css": "Responsive design, modern layout grids (Flexbox/Grid), and fluid animations.",
            "skill-name-js": "JavaScript",
            "skill-desc-js": "Frontend interactive programming, DOM manipulation, and web service integration.",
            "skill-name-vscode": "Visual Studio Code",
            "skill-desc-vscode": "Primary development environment highly optimized through shortcuts and extensions.",
            "skill-name-git": "Git",
            "skill-desc-git": "Distributed version control, branching workflows, and efficient code merging.",
            "skill-name-github": "GitHub",
            "skill-desc-github": "Collaborative repository management, Pull Requests, and Code Reviews.",
            "skill-name-gitlab": "GitLab",
            "skill-desc-gitlab": "Continuous integration and delivery (CI/CD) pipelines adapted for professional use.",
            "skill-name-sourcetree": "SourceTree",
            "skill-desc-sourcetree": "Visual and interactive management of advanced Git branching workflows.",
            "skill-name-trello": "Trello",
            "skill-desc-trello": "Agile project planning through dynamic Kanban and Scrum boards.",
            "skill-name-windows": "Windows",
            "skill-desc-windows": "Operating systems administration and native scripting for automation workflows.",
            "skill-name-ubuntu": "Ubuntu / Linux",
            "skill-desc-ubuntu": "Dedicated server configuration and web deployment using command-line interface.",
            "skill-name-premiere": "Adobe Premiere Pro",
            "level-very-high": "VERY HIGH",
            "level-high": "HIGH",
            "cal-title": "Technical Booking / Interview",
            "cal-description": "Would you like to schedule a meeting or technical interview with me? Select a date and time that fits your schedule to discuss your projects or job vacancies.",
            "cal-location-type": "Google Meet / Discord / Teams",
            "cal-timezone": "Europe/Madrid (UTC+1)",
            "cal-success-title": "Meeting Pre-scheduled!",
            "cal-success-body": "Your email client has been opened to send the confirmation. Talk to you soon!",
            "cal-confirm": "Confirm",
            "cal-close": "Close",
            "cal-select-day": "Select a day",
            "cal-selected-prefix": "Slots for",
            "footer-text": "&copy; 2026 César Castellano García | Las Palmas, Spain",
            "day-sun": "SUN",
            "day-mon": "MON",
            "day-tue": "TUE",
            "day-wed": "WED",
            "day-thu": "THU",
            "day-fri": "FRI",
            "day-sat": "SAT"
        }
    };

    // Función asíncrona para cargar las traducciones
    async function changeLanguage(lang) {
        let translations = null;

        // Si se abre localmente (protocolo file://), cargamos directamente del diccionario local para evitar errores de CORS
        if (window.location.protocol === "file:") {
            translations = localTranslations[lang] || localTranslations["es"];
        } else {
            try {
                const response = await fetch(`lang/${lang}.json`);
                if (response.ok) {
                    translations = await response.json();
                }
            } catch (fetchError) {
                console.warn("Error cargando translations vía fetch, usando fallback local:", fetchError);
            }
        }

        // Si por alguna razón no se ha cargado, recurrimos al diccionario local
        if (!translations) {
            translations = localTranslations[lang] || localTranslations["es"];
        }

        window.currentTranslations = translations;

        const elementsToTranslate = document.querySelectorAll("[data-i18n]");

        // Recorremos los elementos del HTML e inyectamos los textos del JSON
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute("data-i18n");
            if (translations[key]) {
                element.innerHTML = translations[key];
            }
        });

        // Guardamos la elección
        localStorage.setItem("language", lang);
        document.documentElement.setAttribute("lang", lang);

        // Sincronizar el texto seleccionado en el custom select
        document.querySelectorAll(".custom-select-container").forEach(container => {
            const selectedOption = container.querySelector(`.custom-option[data-value="${lang}"]`);
            if (selectedOption) {
                const options = container.querySelectorAll(".custom-option");
                options.forEach(opt => opt.classList.remove("selected"));
                selectedOption.classList.add("selected");

                const triggerText = container.querySelector(".trigger-text");
                if (triggerText) triggerText.innerHTML = selectedOption.innerHTML;
            }
        });

        if (typeof window.updateActiveSkillTranslation === "function") {
            window.updateActiveSkillTranslation();
        }

        // Recalcular la traducción del simulador de Cal.com si existiera
        if (typeof window.updateCalComTranslation === "function") {
            window.updateCalComTranslation();
        }

        // Traducir en caliente el texto seleccionado del selector de paletas
        const paletteContainer = document.getElementById("palette-select-container");
        if (paletteContainer) {
            const textSpan = paletteContainer.querySelector(".trigger-text");
            const selectedOption = paletteContainer.querySelector(".custom-option.selected");
            if (textSpan && selectedOption) {
                const i18nKey = selectedOption.getAttribute("data-i18n");
                if (i18nKey && translations[i18nKey]) {
                    // La opción tiene clave de traducción (ej: "gold-theme", "forest-theme")
                    textSpan.innerHTML = translations[i18nKey];
                } else {
                    // La opción no tiene traducción (ej: "Original", "Cyber") → usar el texto tal cual
                    textSpan.innerHTML = selectedOption.querySelector("span")?.innerHTML || textSpan.innerHTML;
                }
            }
        }
    }

    // Guardamos una referencia global de la función para usarla en el bloque de proyectos
    updateTranslationsGlobal = () => {
        const savedLang = localStorage.getItem("language") || "es";
        changeLanguage(savedLang);
    };

    // Hacemos la función disponible globalmente para el controlador de selectores
    window.changeLanguageGlobal = changeLanguage;

    // Inicializar con el idioma guardado o por defecto 'es'
    const savedLang = localStorage.getItem("language") || "es";
    changeLanguage(savedLang);
});

// Administra la edad actual que tengo
document.addEventListener("DOMContentLoaded", () => {
    const birthDate = new Date(2001, 3, 27); // 27 de abril de 2001
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

    // Comprobar si el usuario ya tenía una preferencia guardada, por defecto "light"
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Sincronización del estado del switch
    themeToggle.checked = (savedTheme === "dark");

    // Escuchar el cambio en el botón de claro/oscuro
    themeToggle.addEventListener("change", (e) => {
        const isSelected = e.target.checked;
        const newTheme = isSelected ? "dark" : "light";

        // Aplicamos el nuevo tema al HTML
        document.documentElement.setAttribute("data-theme", newTheme);
        // Guardamos la elección para que no se pierda al recargar la página
        localStorage.setItem("theme", newTheme);
    });
});

// Controlador de Selectores Personalizados y Cambio de Paleta
document.addEventListener("DOMContentLoaded", () => {
    const customSelects = document.querySelectorAll(".custom-select-container");

    // Cargar e inicializar estados guardados
    const savedPalette = localStorage.getItem("palette") || "original";
    document.documentElement.setAttribute("data-palette", savedPalette);

    const savedLang = localStorage.getItem("language") || "es";

    customSelects.forEach(container => {
        const trigger = container.querySelector(".custom-select-trigger");
        const menu = container.querySelector(".custom-options-menu");
        const options = container.querySelectorAll(".custom-option");
        const textSpan = trigger.querySelector(".trigger-text");

        // Inicializar la opción activa según guardada
        if (container.id === "palette-select-container") {
            const activeOption = container.querySelector(`.custom-option[data-value="${savedPalette}"]`);
            if (activeOption) {
                options.forEach(opt => opt.classList.remove("selected"));
                activeOption.classList.add("selected");
                textSpan.innerHTML = activeOption.innerHTML;
                // Guardamos el valor inicial de la paleta en el contenedor de texto
                textSpan.setAttribute("data-current-palette", savedPalette.replace("-theme", ""));
            }
        } else if (container.id === "lang-select-container") {
            const activeOption = container.querySelector(`.custom-option[data-value="${savedLang}"]`);
            if (activeOption) {
                options.forEach(opt => opt.classList.remove("selected"));
                activeOption.classList.add("selected");
                textSpan.innerHTML = activeOption.innerHTML;
            }
        }

        // Abrir/Cerrar menú al hacer clic en el trigger
        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = container.classList.contains("open");

            // Cerrar todos los demás custom selects
            document.querySelectorAll(".custom-select-container").forEach(c => {
                if (c !== container) c.classList.remove("open");
            });

            if (isOpen) {
                container.classList.remove("open");
                trigger.setAttribute("aria-expanded", "false");
            } else {
                container.classList.add("open");
                trigger.setAttribute("aria-expanded", "true");
            }
        });

        // Manejar selección de opciones
        options.forEach(option => {
            option.addEventListener("click", (e) => {
                e.stopPropagation();
                const value = option.getAttribute("data-value");

                // Actualizar selección
                options.forEach(opt => opt.classList.remove("selected"));
                option.classList.add("selected");

                // Actualizar texto en el disparador (trigger)
                textSpan.innerHTML = option.innerHTML;

                // Cerrar menú
                container.classList.remove("open");
                trigger.setAttribute("aria-expanded", "false");

                // Aplicar lógica según el selector
                if (container.id === "palette-select-container") {
                    document.documentElement.setAttribute("data-palette", value);
                    localStorage.setItem("palette", value);
                    // Se guarda el valor limpio (sin "-theme") para que la traducción siempre funcione
                    const cleanValue = value.replace("-theme", "");
                    textSpan.setAttribute("data-current-palette", cleanValue);
                    // Forzar la traducción inmediata al idioma activo
                    const activeLang = localStorage.getItem("language") || "es";
                    if (window.currentTranslations) {
                        const key = `${cleanValue}-theme`;
                        if (window.currentTranslations[key]) {
                            textSpan.innerHTML = window.currentTranslations[key];
                        }
                    }
                } else if (container.id === "lang-select-container") {
                    if (typeof window.changeLanguageGlobal === "function") {
                        window.changeLanguageGlobal(value);
                    }
                }
            });
        });
    });

    // Cerrar todos los selectores al hacer clic en cualquier lugar fuera de ellos
    document.addEventListener("click", () => {
        document.querySelectorAll(".custom-select-container").forEach(container => {
            container.classList.remove("open");
            const trigger = container.querySelector(".custom-select-trigger");
            if (trigger) trigger.setAttribute("aria-expanded", "false");
        });
    });
});

// --- Lógica para la animación de aparición al hacer Scroll ---
function initScrollAnimations() {
    const sections = document.querySelectorAll('.fade-in-section');

    const options = {
        root: null, // El viewport del navegador
        // '0px 0px -80px 0px' crea una línea virtual 80px por encima del fondo de la pantalla.
        // En cuanto el borde superior de CUALQUIER sección toca esa línea, se dispara.
        rootMargin: '0px 0px -80px 0px',
        threshold: 0 // Activación inmediata al cruzar el margen
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
// Asegura de llamar a la función dentro de tu inicializador nativo
document.addEventListener('DOMContentLoaded', () => {
    // … tus otras funciones (getAge, temas, idiomas, etc.) …

    // Inicializar animaciones de scroll
    initScrollAnimations();
});

// Controlador de pestañas de experiencia (CV Tabs)
document.addEventListener("DOMContentLoaded", () => {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");
    const indicator = document.querySelector(".active-indicator");

    if (tabBtns.length === 0) return;

    function updateIndicator(activeBtn) {
        if (!indicator) return;

        if (window.innerWidth <= 900) {
            indicator.style.top = "auto";
            indicator.style.bottom = "0";
            indicator.style.left = `${activeBtn.offsetLeft}px`;
            indicator.style.width = `${activeBtn.offsetWidth}px`;
            indicator.style.height = "2px";
        } else {
            indicator.style.left = "0";
            indicator.style.bottom = "auto";
            indicator.style.top = `${activeBtn.offsetTop}px`;
            indicator.style.height = `${activeBtn.offsetHeight}px`;
            indicator.style.width = "2px";
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            tabPanels.forEach(p => {
                p.classList.remove("active");
                p.setAttribute("hidden", "true");
            });

            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            const targetId = btn.getAttribute("aria-controls");
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add("active");
                targetPanel.removeAttribute("hidden");
            }

            updateIndicator(btn);
        });
    });

    const activeBtn = document.querySelector(".tab-btn.active");
    if (activeBtn) {
        setTimeout(() => updateIndicator(activeBtn), 150);
    }

    window.addEventListener("resize", () => {
        const currentActive = document.querySelector(".tab-btn.active");
        if (currentActive) updateIndicator(currentActive);
    });
});

// Controlador interactivo de habilidades (Skills Details Dashboard)
document.addEventListener("DOMContentLoaded", () => {
    const skillBtns = document.querySelectorAll(".skill-icon-btn");
    const iconsDiv = document.querySelector(".skills-icons-div");
    const panel = document.getElementById("skill-details-panel");
    const placeholder = document.getElementById("skill-details-placeholder");
    const content = document.getElementById("skill-details-content");
    const nameLabel = document.getElementById("skill-details-name");
    const levelLabel = document.getElementById("skill-details-level");
    const descLabel = document.getElementById("skill-details-desc");

    if (skillBtns.length === 0) return;

    const skillLevels = {
        unity: "very-high",
        csharp: "very-high",
        blender: "high",
        photoshop: "high",
        html: "very-high",
        css: "very-high",
        js: "high",
        vscode: "very-high",
        git: "very-high",
        github: "very-high",
        gitlab: "high",
        sourcetree: "high",
        trello: "high",
        windows: "very-high",
        ubuntu: "high",
        premiere: "high"
    };

    const skillColors = {
        unity: "#5f6d7c",
        csharp: "#9a4993",
        blender: "#e87d0d",
        photoshop: "#00c8ff",
        html: "#e44d26",
        css: "#264de4",
        js: "#f7df1e",
        vscode: "#007acc",
        git: "#f05032",
        github: "#9e4716", 
        gitlab: "#fc6d26",
        sourcetree: "#0052cc",
        trello: "#0079bf",
        windows: "#0078d7",
        ubuntu: "#e95420",
        premiere: "#9999ff"
    };

    let pinnedSkill = null;
    let activeSkill = null;

    function showSkillDetails(skillId) {
        if (!skillId || !skillLevels.hasOwnProperty(skillId)) return;

        activeSkill = skillId;

        // Obtener textos traducidos
        const trans = window.currentTranslations || {};
        const skillName = trans[`skill-name-${skillId}`] || skillId.toUpperCase();
        const skillDesc = trans[`skill-desc-${skillId}`] || "";

        // Mapear nivel cualitativo en base al idioma
        const levelKey = skillLevels[skillId] === "very-high" ? "level-very-high" : "level-high";
        const levelText = trans[levelKey] || (skillLevels[skillId] === "very-high" ? "MUY ALTO" : "ALTO");

        // Rellenar UI
        if (nameLabel) nameLabel.textContent = skillName;
        if (levelLabel) levelLabel.textContent = levelText;
        if (descLabel) descLabel.innerHTML = skillDesc;

        // Establecer color de la habilidad dinámicamente
        if (panel) {
            const skillColor = skillColors[skillId] || "var(--accent-color)";
            panel.style.setProperty("--skill-color", skillColor);
            panel.classList.add("active-skill-selected");
        }

        // Transición de paneles
        if (placeholder) placeholder.style.display = "none";
        if (content) {
            content.style.display = "flex";
            // Forzar reflow para relanzar animación si es necesario
            content.style.animation = "none";
            content.offsetHeight;
            content.style.animation = null;
        }

        // Añadir clase indicando que hay una habilidad activa
        if (iconsDiv) iconsDiv.classList.add("has-active-skill");
    }

    function clearSkillDetails() {
        if (pinnedSkill) {
            showSkillDetails(pinnedSkill);
        } else {
            activeSkill = null;
            if (content) content.style.display = "none";
            if (placeholder) placeholder.style.display = "flex";
            if (iconsDiv) iconsDiv.classList.remove("has-active-skill");

            // Limpiar color de la habilidad
            if (panel) {
                panel.style.removeProperty("--skill-color");
                panel.classList.remove("active-skill-selected");
            }
        }
    }

    // Registrar la función global de actualización para cambio de idioma
    window.updateActiveSkillTranslation = () => {
        if (activeSkill) {
            showSkillDetails(activeSkill);
        }
    };

    skillBtns.forEach(btn => {
        const skillId = btn.getAttribute("data-skill");

        // Hover
        btn.addEventListener("mouseenter", () => {
            showSkillDetails(skillId);
        });

        // Mouse leave
        btn.addEventListener("mouseleave", () => {
            clearSkillDetails();
        });

        // Click / Pin
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            if (pinnedSkill === skillId) {
                // Des-fijar si ya estaba fijado
                pinnedSkill = null;
                btn.classList.remove("pinned");
                clearSkillDetails();
            } else {
                // Limpiar pinned anterior
                skillBtns.forEach(b => b.classList.remove("pinned"));

                // Fijar el nuevo
                pinnedSkill = skillId;
                btn.classList.add("pinned");
                showSkillDetails(skillId);
            }
        });
    });

    // Desfijar al hacer clic en cualquier parte fuera de los botones
    document.addEventListener("click", () => {
        if (pinnedSkill) {
            pinnedSkill = null;
            skillBtns.forEach(b => b.classList.remove("pinned"));
            clearSkillDetails();
        }
    });
});

// Animación de aparición escalonada (Staggered Reveal) para el Timeline de Formación
function initTimelineAnimation() {
    const timeline = document.querySelector(".education-timeline");
    const items = document.querySelectorAll(".timeline-item");

    if (!timeline) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Revelar la línea vertical
                timeline.classList.add("revealed");

                // Revelar los items de forma escalonada (staggered)
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add("revealed");
                    }, 150 + index * 220); // 150ms delay base, y 220ms entre cada item
                });

                observer.unobserve(timeline);
            }
        });
    }, {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.15
    });

    observer.observe(timeline);
}

// Controlador de la Consola de Proyectos Interactiva
function initProjectsConsole() {
    const navButtons = document.querySelectorAll(".project-nav-btn");
    const detailPanels = document.querySelectorAll(".project-detail-panel");

    if (navButtons.length === 0) return;

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-project-target");
            const targetPanel = document.getElementById(targetId);

            if (!targetPanel) return;

            // Actualizar estado del botón de navegación
            navButtons.forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            // Alternar paneles de detalles
            detailPanels.forEach(panel => {
                panel.classList.remove("active");
                panel.style.display = "none";
            });

            targetPanel.classList.add("active");
            // Deja que el CSS determine el display (grid)
            targetPanel.style.display = ""; 
            // Forzar reflow
            targetPanel.offsetHeight;
        });
    });
}

// Inicializar animaciones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    initTimelineAnimation();
    initProjectsConsole();
});