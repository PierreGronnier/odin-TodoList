import "./styles.css";
import { populateProjectDropdown, addProjectsToDOM, addTasksToDOM} from "./DOM";
import { initializeTaskEvents } from "./task";
import { initializeProjectEvents } from "./project";
import { loadFromLocalStorage } from "./storage";
import { createProject, createTask } from "./appLogic";

const projects = [];
const tasks = [];

loadFromLocalStorage(projects, tasks);

if (projects.length === 0) {
  const defaultProject = createProject("Starter Project", "This is the default project.");
  projects.push(defaultProject);
  tasks.push(createTask("Default Task 1", "Description of task 1", "2025-01-31", "High", defaultProject.idProject));
  tasks.push(createTask("Default Task 2", "Description of task 2", "2025-02-05", "Medium", defaultProject.idProject));
}

document.addEventListener("DOMContentLoaded", () => {
  populateProjectDropdown(projects);
  addProjectsToDOM(projects, tasks);
  const initialProjectId = projects[0]?.idProject; 
  const initialTasks = tasks.filter((task) => task.idProject === initialProjectId);
  addTasksToDOM(initialTasks, projects, initialProjectId); 
  initializeTaskEvents(projects, tasks);
  initializeProjectEvents(projects, tasks);
});