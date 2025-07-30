import { buscarRespuesta, FALLBACK } from "../qna.js";

export function renderCanales() {
  setTimeout(() => {
    const box = document.querySelector(".canales-section .question-box");
    if (!box) return;
    const input = box.querySelector("input");
    const button = box.querySelector("button");
    const respuesta = document.createElement("div");
    box.appendChild(respuesta);
    button.addEventListener("click", async () => {
      const texto = input.value.trim();
      const resultado = await buscarRespuesta("canales", texto);
      respuesta.textContent = resultado;
      respuesta.className =
        resultado === FALLBACK ? "mensaje-fallback" : "respuesta-texto";
    });
  });

  return `
    <section class="dashboard-section canales-section">
      <h2 class="text-xl font-semibold mb-4">Canales</h2>
      <img src="app/images/indicadores/indicador1.png" alt="Indicador de Canales" class="indicador-img mb-4 rounded-md shadow">
      <div class="question-box">
        <input type="text" placeholder="Escribe tu pregunta..." class="flex-grow border border-gray-300 rounded-md p-2" />
        <button class="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Preguntar</button>
      </div>
    </section>
  `;
}
