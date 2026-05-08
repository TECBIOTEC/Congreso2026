// Esperar a que todo el HTML se cargue antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       1. CUENTA REGRESIVA
       ========================================== */
    const countdownEl = document.getElementById("countdown");

    // Solo ejecutamos el contador si el elemento existe en la página
    if (countdownEl) {
        // Configuración de la nueva fecha de inicio del evento: 4 de junio de 2026
        const eventDate = new Date("June 4, 2026 09:00:00").getTime();

        // Actualiza la cuenta regresiva cada segundo
        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            // Si el evento ya llegó, detenemos el contador y salimos de la función
            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownEl.innerHTML = "¡El evento ha comenzado!";
                return; 
            }

            // Cálculos de tiempo
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Inyectar el resultado en el HTML (usando Template Literals)
            countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }

    /* ==========================================
       2. MANEJO DEL TEMA (CLARO / OSCURO)
       ========================================== */

    // Función para cambiar la imagen del logo según el tema
    const updateLogo = () => {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const logo = document.getElementById('logo-main');
        
        // Verificamos si el logo existe antes de cambiar su ruta
        if (logo) {
            // Sintaxis corta: Si es dark usa logoTB, sino logoTN
            logo.src = currentTheme === 'dark' ? 'images/logoTB.png' : 'images/logoTN.png';
        }
    };

    // Función para actualizar el ícono del botón de tema
    const updateThemeIcon = (theme) => {
        const themeIcon = document.querySelector('.theme-icon-active');
        if (!themeIcon) return; // Evita errores si no encuentra el ícono

        if (theme === 'light') {
            themeIcon.innerHTML = '<use href="#sun-fill"></use>';
        } else if (theme === 'dark') {
            themeIcon.innerHTML = '<use href="#moon-stars-fill"></use>';
        } else {
            themeIcon.innerHTML = '<use href="#circle-half"></use>';
        }
    };

    // 2.1 Aplicar el tema guardado en el almacenamiento local al inicio (si existe)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    // Asegurar que el logo correcto cargue desde el inicio
    updateLogo(); 

    // 2.2 Escuchar los clics en los botones de cambio de tema
    document.querySelectorAll('[data-bs-theme-value]').forEach((button) => {
        button.addEventListener('click', function () {
            const theme = this.getAttribute('data-bs-theme-value');
            document.documentElement.setAttribute('data-bs-theme', theme);
            localStorage.setItem('theme', theme);
            
            updateLogo(); 
            updateThemeIcon(theme);
        });
    });

    /* ==========================================
       3. INICIALIZACIÓN DE BOOTSTRAP (Popovers y Tooltips)
       ========================================== */

    // Inicialización de Tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltipTriggerEl) => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicialización de Popovers
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach((popoverTriggerEl) => {
        new bootstrap.Popover(popoverTriggerEl);
    });

});