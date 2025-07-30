import {
  getCurrentLeader,
  setCurrentLeader,
  clearCurrentLeader,
} from "../auth/leaderSession.js";
import { LEADERS } from "../constants.js";
import {
  addAlert,
  getAlertsByAuthor,
  updateAlert,
  deleteAlert,
} from "../modules/alertManager.js";
import { renderAlertas } from "./alertasView.js";

function showAuthModal() {
  const modal = document.getElementById("leader-auth-modal");
  if (!modal) return;
  modal.style.display = "flex";
}

function hideAuthModal() {
  const modal = document.getElementById("leader-auth-modal");
  if (!modal) return;
  modal.style.display = "none";
}

function setupAuth() {
  const btn = document.getElementById("leaderAuthBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const input = document.getElementById("leaderNameInput");
    const name = (input.value || "").trim();
    if (!LEADERS.includes(name)) {
      alert("Nombre de líder no válido");
      return;
    }
    setCurrentLeader(name);
    hideAuthModal();
    renderLeaderSection();
  });
}

function createAlertElement(alerta, leader) {
  const item = document.createElement("div");
  const text = document.createElement("p");
  text.innerHTML = alerta.mensaje;
  const info = document.createElement("small");
  info.textContent = new Date(alerta.fecha).toLocaleString();
  const editBtn = document.createElement("button");
  editBtn.textContent = "Editar";
  const delBtn = document.createElement("button");
  delBtn.textContent = "Eliminar";

  editBtn.addEventListener("click", () => {
    let nuevo = prompt("Editar alerta", alerta.mensaje);
    if (nuevo === null) return;
    if (!nuevo.trim()) {
      alert("El mensaje no puede estar vacío");
      return;
    }
    updateAlert(alerta.id, nuevo, leader);
    renderAlertsList();
  });

  delBtn.addEventListener("click", () => {
    deleteAlert(alerta.id, leader);
    renderAlertsList();
  });

  item.appendChild(text);
  item.appendChild(info);
  item.appendChild(editBtn);
  item.appendChild(delBtn);
  return item;
}

function renderAlertsList() {
  const leader = getCurrentLeader();
  const list = document.getElementById("alertList");
  if (!leader || !list) return;
  const datos = getAlertsByAuthor(leader);
  list.innerHTML = "";
  datos.forEach((a) => list.appendChild(createAlertElement(a, leader)));
}

function renderLeaderSection() {
  const container = document.getElementById("content");
  if (!container) return;
  const leader = getCurrentLeader();
  if (!leader) {
    showAuthModal();
    return;
  }
  container.innerHTML = `
    <section class="dashboard-section" id="leader-alerts-section">
      <h2 class="text-xl font-semibold mb-4">Mis Alertas</h2>
      <button id="exitLeaderBtn" class="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Salir</button>
      <div id="alertList" class="space-y-2"></div>
      <form id="alertForm" class="space-y-2">
        <div>Autor: <span id="alertAuthor">${leader}</span></div>
        <textarea id="alertMessage" class="w-full h-24 border border-gray-300 rounded-md p-2"></textarea>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Agregar</button>
      </form>
    </section>
  `;
  document.getElementById("alertForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const msgInput = document.getElementById("alertMessage");
    const mensaje = msgInput.value.trim();
    if (!mensaje) {
      alert("El mensaje no puede estar vacío");
      return;
    }
    addAlert(mensaje, leader);
    msgInput.value = "";
    renderAlertsList();
  });
  document
    .getElementById("exitLeaderBtn")
    .addEventListener("click", () => {
      clearCurrentLeader();
      container.innerHTML = renderAlertas();
      attachLeaderButton();
    });
  renderAlertsList();
}

function attachLeaderButton() {
  const btn = document.getElementById("openLeaderBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const leader = getCurrentLeader();
    if (leader) {
      renderLeaderSection();
    } else {
      showAuthModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupAuth();
  const target = document.getElementById("content");
  if (target) {
    const observer = new MutationObserver(attachLeaderButton);
    observer.observe(target, { childList: true, subtree: true });
  }
  attachLeaderButton();
});
