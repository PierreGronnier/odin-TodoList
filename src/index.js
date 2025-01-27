import "./styles.css";
import { populateProjectDropdown, addTasksToDOM, showModal, hideModal } from "./DOM";
import { createTask, createProject } from "./appLogic";

const projects = [];
const tasks = [];

const defaultProject = createProject("Starter Project", "This is the default project.");
projects.push(defaultProject);
tasks.push(createTask("Default Task 1", "Description of task 1", "2025-01-31", "High", defaultProject.idProject));
tasks.push(createTask("Default Task 2", "Description of task 2", "2025-02-05", "Medium", defaultProject.idProject));

document.addEventListener("DOMContentLoaded", () => {
    populateProjectDropdown(projects);
    addTasksToDOM(tasks.filter(task => task.idProject === defaultProject.idProject), projects);
});

document.getElementById("add-task-btn").addEventListener("click", showModal);

document.getElementById("cancel-btn").addEventListener("click", hideModal);

document.getElementById("task-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
    const dueDate = document.getElementById("task-due-date").value;
    const priority = document.getElementById("task-priority").value;
    const idProject = document.getElementById("task-idProject").value;

    const task = createTask(title, description, dueDate, priority, idProject);
    tasks.push(task);

    addTasksToDOM(tasks.filter(t => t.idProject === idProject), projects);

    hideModal();
    e.target.reset();
});

document.getElementById("add-project-btn").addEventListener("click", () => {
    
});
