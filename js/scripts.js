// =========================================================
// TECBIOTEC 2026 - Scripts principales
// Bootstrap 5.3 + Tailwind CSS 4
// 21-05-2026
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    /* =====================
       1. CUENTA REGRESIVA
       ===================== */

    const countdownEl = document.getElementById("countdown");

    if (countdownEl) {
        // Fechas del evento en horario de Uruguay (UTC-3)
        const eventStart = new Date("2026-06-04T09:00:00-03:00").getTime();
        const secondDayStart = new Date("2026-06-05T00:00:00-03:00").getTime();
        const eventEnd = new Date("2026-06-06T00:00:00-03:00").getTime();

        let countdownInterval = null;

        const updateCountdown = () => {
            const now = Date.now();

            // Antes del inicio oficial: cuenta regresiva
            if (now < eventStart) {
                const distance = eventStart - now;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((distance / (1000 * 60)) % 60);
                const seconds = Math.floor((distance / 1000) % 60);

                countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                return;
            }

            // 4 de junio, desde las 09:00: primer día del congreso
            if (now >= eventStart && now < secondDayStart) {
                countdownEl.textContent = "Primer día de congreso";
                return;
            }

            // 5 de junio: segundo día del congreso
            if (now >= secondDayStart && now < eventEnd) {
                countdownEl.textContent = "Segundo día de congreso";
                return;
            }

            // Después del 5 de junio
            countdownEl.textContent = "El evento ha finalizado";

            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
        };

        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    /* ==========================================
       2. MANEJO DEL TEMA CLARO / OSCURO / AUTO
       ========================================== */

    const getStoredTheme = () => {
        try {
            return localStorage.getItem("theme");
        } catch (error) {
            return null;
        }
    };

    const setStoredTheme = (theme) => {
        try {
            localStorage.setItem("theme", theme);
        } catch (error) {
            // Si localStorage no está disponible, no se rompe la web.
        }
    };

    const getSystemTheme = () => {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();

        if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "auto") {
            return storedTheme;
        }

        return "auto";
    };

    const applyTheme = (theme) => {
        const resolvedTheme = theme === "auto" ? getSystemTheme() : theme;
        document.documentElement.setAttribute("data-bs-theme", resolvedTheme);
        updateLogo(resolvedTheme);
        updateThemeIcon(theme);
        updateThemeButtons(theme);
    };

    const updateLogo = (resolvedTheme) => {
        const logo = document.getElementById("logo-main");

        if (!logo) return;

        logo.src = resolvedTheme === "dark"
            ? "images/logoTB.png"
            : "images/logoTN.png";
    };

    const updateThemeIcon = (theme) => {
        const themeIcon = document.querySelector(".theme-icon-active");

        if (!themeIcon) return;

        const iconHref = {
            light: "#sun-fill",
            dark: "#moon-stars-fill",
            auto: "#circle-half"
        };

        themeIcon.innerHTML = `<use href="${iconHref[theme] || iconHref.auto}"></use>`;
    };

    const updateThemeButtons = (activeTheme) => {
        document.querySelectorAll("[data-bs-theme-value]").forEach((button) => {
            const buttonTheme = button.getAttribute("data-bs-theme-value");
            const isActive = buttonTheme === activeTheme;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", isActive ? "true" : "false");

            const checkIcon = button.querySelector("svg:last-child");
            if (checkIcon) {
                checkIcon.classList.toggle("d-none", !isActive);
            }
        });
    };

    // Aplicar tema inicial
    applyTheme(getPreferredTheme());

    // Escuchar clics en selector de tema
    document.querySelectorAll("[data-bs-theme-value]").forEach((button) => {
        button.addEventListener("click", () => {
            const selectedTheme = button.getAttribute("data-bs-theme-value");

            if (!selectedTheme) return;

            setStoredTheme(selectedTheme);
            applyTheme(selectedTheme);
        });
    });

    // Si el usuario tiene modo AUTO, responder a cambios del sistema
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (getPreferredTheme() === "auto") {
            applyTheme("auto");
        }
    });

    /* =======================================
       3. INICIALIZACIÓN SEGURA DE BOOTSTRAP
       ======================================= */

    if (typeof bootstrap !== "undefined") {

        // Tooltips
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltipTriggerEl) => {
            bootstrap.Tooltip.getOrCreateInstance(tooltipTriggerEl);
        });

        // Popovers
        document.querySelectorAll('[data-bs-toggle="popover"]').forEach((popoverTriggerEl) => {
            bootstrap.Popover.getOrCreateInstance(popoverTriggerEl);
        });

    } else {
        console.warn("Bootstrap no está disponible. Revisa que bootstrap.bundle.min.js cargue antes de scripts.js.");
    }

});