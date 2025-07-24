import { buscarRespuesta, FALLBACK } from "../qna.js";
import { cargarBloqueImagen, fechaHoyYYYYMMDD } from "../utils/imageLoader.js";

export function renderEmbudo() {
  setTimeout(() => {
    const box = document.querySelector(".embudo-section .question-box");
    if (!box) return;
    const input = box.querySelector("input");
    const button = box.querySelector("button");
    const respuesta = document.createElement("div");
    box.appendChild(respuesta);
    button.addEventListener("click", async () => {
      const texto = input.value.trim();
      const resultado = await buscarRespuesta("embudo", texto);
      respuesta.textContent = resultado;
      respuesta.className =
        resultado === FALLBACK ? "mensaje-fallback" : "respuesta-texto";
    });

    const ruta = `imagenes/embudo_${fechaHoyYYYYMMDD()}.png`;
    const fallbackHtml = `
        <p class="text-gray-500">No se encontr\u00f3 el gr\u00e1fico del embudo para hoy.</p>
        <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Ver informe completo
        </button>
      `;
    cargarBloqueImagen("contenedor-Embudo", ruta, fallbackHtml);
  });

  return `
    <section id="Embudo" class="dashboard-section embudo-section p-4">
      <h2 class="text-xl font-bold text-gray-800 mb-2">Indicador de Embudo</h2>
      <div id="contenedor-Embudo" class="bg-white p-4 rounded shadow"></div>
      <div class="question-box">
        <input type="text" placeholder="Escribe tu pregunta..." />
        <button>Preguntar</button>
      </div>
    </section>
  `;
}
