export function showModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
}

export function hideModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
}

export function showProjectModal() {
  const projectModal = document.getElementById("project-modal");
  projectModal.classList.remove("hidden");
}

export function hideProjectModal() {
  const projectModal = document.getElementById("project-modal");
  projectModal.classList.add("hidden");
}