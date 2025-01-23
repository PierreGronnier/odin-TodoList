export default class Task {
    constructor(title, description, dueDate, priority, notes = "", checklist = []) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.completed = false; 
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}
