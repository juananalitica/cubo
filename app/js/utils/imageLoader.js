export function imgExiste(src, callback) {
  const img = new Image();
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
  img.src = src;
}

export function cargarBloqueImagen(contId, src, fallbackHtml) {
  const cont = document.getElementById(contId);
  if (!cont) return;
  imgExiste(src, (existe) => {
    if (existe) {
      cont.innerHTML = `<img src="${src}" alt="Gr\u00e1fico" class="w-full rounded">`;
    } else {
      cont.innerHTML = fallbackHtml;
    }
  });
}

export function fechaHoyYYYYMMDD() {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}
