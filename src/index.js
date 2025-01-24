import "./styles.css";
import { showModal, hideModal, addTaskToDOM } from "./DOM";
import { createTask } from "./appLogic";

document.getElementById("add-task-btn").addEventListener("click", showModal);

document.getElementById("cancel-btn").addEventListener("click", (e) => {
    hideModal();
    document.getElementById("task-form").reset();
});

document.getElementById("task-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
    const dueDate = document.getElementById("task-due-date").value;
    const priority = document.getElementById("task-priority").value;

    const task = createTask(title, description, dueDate, priority);
    addTaskToDOM(task);

    hideModal();
    e.target.reset();
});



