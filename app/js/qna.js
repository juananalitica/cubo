export const FALLBACK =
  "No encontr\u00e9 datos para tu b\u00fasqueda actual. \u00bfQuieres revisar el informe general del \u00e1rea? \nAbrir informe general. O contacta directamente a Carlos Mart\u00ednez, creador del informe.";

export async function buscarRespuesta(seccion, pregunta) {
  try {
    const resp = await fetch(`app/data/respuestas_${seccion}.json`);
    if (!resp.ok) {
      return FALLBACK;
    }
    const datos = await resp.json();
    const texto = (pregunta || "").toLowerCase();
    for (const par of datos) {
      if (texto.includes(par.clave.toLowerCase())) {
        return par.respuesta;
      }
    }
    return FALLBACK;
  } catch (e) {
    return FALLBACK;
  }
}

