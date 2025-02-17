export default class Task {
  constructor(title, description, dueDate, priority, idProject) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.idProject = idProject;
    this.completed = false;
    this.id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  }
}
