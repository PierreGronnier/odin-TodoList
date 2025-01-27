import Task from "./task";
import Project from "./Project";

export function createTask(title, description, dueDate, priority, idProject) {
    return new Task(title, description, dueDate, priority, idProject);
}

export function createProject(title, description) {
    const idProject = `${title}-${Date.now()}`;
    return new Project(idProject, title, description);
}