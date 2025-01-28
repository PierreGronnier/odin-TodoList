let projectIdCounter = 1;
let taskIdCounter = 1;

export function createProject(title, description) {
  return {
    idProject: projectIdCounter++,
    title,
    description,
  };
}

export function createTask(title, description, dueDate, priority, idProject) {
  return {
    idTask: taskIdCounter++,
    title,
    description,
    dueDate,
    priority,
    idProject,
  };
}