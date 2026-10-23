const levelValue = document.getElementById("levelValue");
const metricLevel = document.getElementById("metricLevel");
const gauge = document.getElementById("gauge");
const progressFill = document.getElementById("progressFill");
const levelStatus = document.getElementById("levelStatus");
const levelMessage = document.getElementById("levelMessage");
const lastUpdate = document.getElementById("lastUpdate");

function updateWaterLevel(level) {
    // Limita el porcentaje entre 0 y 100.
    level = Math.max(0, Math.min(100, level));

    // Actualiza los números.
    levelValue.textContent = level;
    metricLevel.textContent = level;

    // Actualiza el indicador circular y la barra.
    gauge.style.setProperty("--level", `${level}%`);
    gauge.setAttribute(
        "aria-label",
        `Nivel simulado del agua: ${level} por ciento`
    );
    progressFill.style.width = `${level}%`;

    // Actualiza el mensaje según el nivel de demostración.
    if (level < 25) {
        levelStatus.textContent = "Nivel bajo";
        levelMessage.textContent =
            "El nivel es bajo en esta simulación. Se recomienda revisar el tanque.";
    } else if (level > 90) {
        levelStatus.textContent = "Nivel alto";
        levelMessage.textContent =
            "El nivel es alto en esta simulación. Conviene verificar la capacidad.";
    } else {
        levelStatus.textContent = "Nivel normal";
        levelMessage.textContent =
            "El nivel está dentro del rango de demostración.";
    }

    // Muestra la hora local de esta actualización.
    lastUpdate.textContent = new Date().toLocaleTimeString("es-CO");
}

// Navegación: resalta la sección visible.
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

function updateNavigation() {
    let currentSection = "inicio";

    sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;

        if (top <= 150) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive =
            link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("active", isActive);
    });
}

window.addEventListener("scroll", updateNavigation, { passive: true });

// Inicia con un valor de ejemplo.
updateWaterLevel(72);
updateNavigation();