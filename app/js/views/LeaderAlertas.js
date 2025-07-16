import { getCurrentLeader, setCurrentLeader } from "../auth/leaderSession.js";
import { LEADERS } from "../constants.js";
import { addAlert, getAlertsByAuthor, updateAlert, deleteAlert } from "../modules/alertManager.js";

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
    renderAlertSection();
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

function renderAlertSection() {
  const container = document.getElementById("content");
  if (!container) return;
  const leader = getCurrentLeader();
  if (!leader) {
    showAuthModal();
    return;
  }
  container.innerHTML = `
    <section class="dashboard-section" id="leader-alerts-section">
      <h2>Mis Alertas</h2>
      <div id="alertList"></div>
      <form id="alertForm">
        <div>Autor: <span id="alertAuthor">${leader}</span></div>
        <textarea id="alertMessage" style="width:100%;height:60px;"></textarea>
        <button type="submit">Agregar</button>
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
  renderAlertsList();
}

function checkSectionLoad() {
  const cont = document.getElementById("content");
  if (!cont) return;
  const h2 = cont.querySelector("h2");
  if (h2 && h2.textContent.trim() === "Alertas" && !document.getElementById("leader-alerts-section")) {
    renderAlertSection();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupAuth();
  const target = document.getElementById("content");
  if (target) {
    const observer = new MutationObserver(checkSectionLoad);
    observer.observe(target, { childList: true, subtree: true });
  }
  checkSectionLoad();
});
