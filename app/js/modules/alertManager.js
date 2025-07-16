import { sanitize } from "../utils/sanitize.js";

const STORAGE_KEY = "cubo_alerts";

function loadAll() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function saveAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getAlertsByAuthor(author) {
  const data = loadAll();
  return data[author] ? [...data[author]] : [];
}

export function addAlert(message, author) {
  const data = loadAll();
  const alerts = data[author] || [];
  const newAlert = {
    id: Date.now().toString(),
    mensaje: sanitize(message),
    autor: author,
    fecha: new Date().toISOString(),
  };
  alerts.push(newAlert);
  data[author] = alerts;
  saveAll(data);
  return newAlert;
}

export function updateAlert(id, message, author) {
  const data = loadAll();
  const alerts = data[author] || [];
  const alerta = alerts.find((a) => a.id === id);
  if (!alerta || alerta.autor !== author) {
    return false;
  }
  alerta.mensaje = sanitize(message);
  saveAll(data);
  return true;
}

export function deleteAlert(id, author) {
  const data = loadAll();
  const alerts = data[author] || [];
  const index = alerts.findIndex((a) => a.id === id);
  if (index === -1) {
    return false;
  }
  alerts.splice(index, 1);
  data[author] = alerts;
  saveAll(data);
  return true;
}
