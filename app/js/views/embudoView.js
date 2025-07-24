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
    <section id="Embudo" class="dashboard-section embudo-section p-4">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Embudo Financiero</h2>
      <div class="mb-4 flex items-center space-x-2">
        <label for="embudo-city" class="font-medium">Ciudad:</label>
        <select id="embudo-city" class="border rounded px-2 py-1">
          <option value="medellin">Medellín</option>
          <option value="bogota">Bogotá</option>
          <option value="cali">Cali</option>
        </select>
        <span id="embudo-balance" class="ml-auto text-lg font-semibold"></span>
      </div>
      <div class="grid gap-4 md:grid-cols-3">
        <canvas id="embudo-monthlyChart"></canvas>
        <canvas id="embudo-donutChart"></canvas>
        <canvas id="embudo-trendChart" class="md:col-span-3"></canvas>
      </div>
      <div class="question-box mt-4">
        <input type="text" placeholder="Escribe tu pregunta..." />
        <button>Preguntar</button>
      </div>
    </section>
  `;
}
