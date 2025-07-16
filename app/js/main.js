// Funciones para el dashboard Cubo

/**
 * Carga el contenido de una sección dentro del elemento main.
 * @param {string} section Nombre de la sección (archivo HTML)
 */
function loadSection(section) {
    const container = document.getElementById('content');
    fetch(`app/views/${section}.html`)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;
        })
        .catch(() => {
            container.innerHTML = '<p>No se pudo cargar la sección.</p>';
        });
}

/**
 * Marca el enlace activo en el menú lateral.
 * @param {HTMLElement} element Enlace que fue clicado
 */
function setActive(element) {
    document.querySelectorAll('.menu a').forEach(a => a.classList.remove('active'));
    element.classList.add('active');
}

/**
 * Alterna la clase 'collapsed' en el sidebar para ocultar o mostrar el menú.
 */
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
}

// Inicializar eventos una vez que el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
    // Manejar clic en el botón de colapso
    document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar);

    // Manejar clic en los ítems del menú
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const section = link.getAttribute('data-section');
            setActive(link);
            loadSection(section);
        });
    });

    // Cargar la sección inicial
    const first = document.querySelector('.menu a');
    if (first) {
        const section = first.getAttribute('data-section');
        loadSection(section);
    }
});
