import Task from "./task";

export function createTask(title, description, dueDate, priority, idProject) {
    return new Task(title, description, dueDate, priority, idProject);
}
