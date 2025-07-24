import { cargarBloqueImagen, fechaHoyYYYYMMDD } from "./utils/imageLoader.js";

export function initEmbudo() {
  const fecha = fechaHoyYYYYMMDD();
  const ruta = `imagenes/embudo_${fecha}.png`;
  const fallback = `
        <p class="text-gray-500">No se encontró el gráfico del embudo para hoy.</p>
        <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ver informe completo</button>
  `;
  cargarBloqueImagen("contenedor-Embudo", ruta, fallback);
}
