import { buscarRespuesta, FALLBACK } from "../qna.js";
import { initEmbudo } from "../dashboard.js";

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

    initEmbudo();
  });

  return `
    <section id="Embudo" class="dashboard-section embudo-section p-4 overflow-y-auto">
      <h2 class="text-xl font-bold text-gray-800 mb-2">Indicador de Embudo</h2>
      <div id="contenedor-Embudo" class="bg-white p-4 rounded shadow"></div>
      <div class="question-box mt-4">
        <input type="text" placeholder="Escribe tu pregunta..." />
        <button>Preguntar</button>
      </div>
    </section>
  `;
}
