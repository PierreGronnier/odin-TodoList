import Project from "./project";
import Task from "./task";

export function saveToLocalStorage(projects, tasks) {
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadFromLocalStorage(projects, tasks) {
  const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedProjects.forEach((proj) => projects.push(new Project(proj.idProject, proj.title, proj.description)));
  savedTasks.forEach((task) =>
    tasks.push(new Task(task.title, task.description, task.dueDate, task.priority, task.idProject))
  );
}