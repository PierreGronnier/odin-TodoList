import { addTasksToDOM } from "./DOM";
import { saveToLocalStorage } from "./storage";

class Task {
    constructor(title, description, dueDate, priority, idProject) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.idProject = idProject;
    }
}
  
export function initializeTaskEvents(projects, tasks) {
  const addTaskBtn = document.getElementById("add-task-btn");
  if (addTaskBtn) {
    addTaskBtn.addEventListener("click", () => {
      const modal = document.getElementById("modal");
      if (modal) {
        modal.classList.remove("hidden");
      }
    });
  }
  
  const cancelBtn = document.getElementById("cancel-btn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      const modal = document.getElementById("modal");
      if (modal) {
        modal.classList.add("hidden");
      }
    });
  }
  
  const taskForm = document.getElementById("task-form");
  if (taskForm) {
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const title = document.getElementById("task-title").value;
      const description = document.getElementById("task-description").value;
      const dueDate = document.getElementById("task-due-date").value;
      const priority = document.getElementById("task-priority").value;
      const idProject = document.getElementById("task-idProject").value;
  
      const task = new Task(title, description, dueDate, priority, parseInt(idProject, 10));
      tasks.push(task);
  
      addTasksToDOM(tasks.filter((t) => t.idProject === parseInt(idProject, 10)), projects);
  
      saveToLocalStorage(projects, tasks);
  
      const modal = document.getElementById("modal");
      if (modal) {
        modal.classList.add("hidden");
      }
      e.target.reset();
    });
  }
}
  
export default Task;