import Storage from './storage.js';
import Task from './task.js';
import Project from './project.js';

export default {
    projects: Storage.loadProjects(),
    tasks: Storage.loadTasks(),

    addTask(taskData) {
        const newTask = new Task(...Object.values(taskData));
        this.tasks.push(newTask);
        Storage.saveTasks(this.tasks);
        return newTask;
    },

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        Storage.saveTasks(this.tasks);
    },

    addProject(projectData) {
        const newProject = new Project(projectData.title, projectData.description);
        this.projects.push(newProject);
        Storage.saveProjects(this.projects);
        return newProject;
    },

    deleteProject(projectId) {
        this.projects = this.projects.filter(project => project.id !== projectId);
        this.tasks = this.tasks.filter(task => task.idProject !== projectId);
        Storage.saveProjects(this.projects);
        Storage.saveTasks(this.tasks);
    },

    getTasksByProject(projectId) {
        return this.tasks.filter(task => task.idProject === projectId);
    }
};