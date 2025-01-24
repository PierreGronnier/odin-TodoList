export function showModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
}

export function hideModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
}

export function addTaskToDOM(task) {
    const contentDiv = document.getElementById("content");
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    taskDiv.style.border = "1px solid #ccc";
    taskDiv.style.borderRadius = "5px";
    taskDiv.style.padding = "10px";
    taskDiv.style.marginBottom = "10px";

    taskDiv.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p><strong>Due:</strong> ${task.dueDate}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
    `;

    contentDiv.appendChild(taskDiv);
}

