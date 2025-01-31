import AppLogic from './appLogic.js';
import {
    isToday,
    isWithinInterval,
    parseISO,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    addMonths,
} from 'date-fns';

export default {
    currentDeleteType: null,
    currentDeleteId: null,

    initEventListeners() {
        document.getElementById('add-task-btn').addEventListener('click', () => this.toggleModal('task'));
        document.getElementById('add-project-btn').addEventListener('click', () => this.toggleModal('project'));

        document.getElementById('task-form').addEventListener('submit', (e) => this.handleTaskSubmit(e));
        document.getElementById('project-form').addEventListener('submit', (e) => this.handleProjectSubmit(e));

        document.getElementById('cancel-btn').addEventListener('click', () => this.toggleModal());
        document.getElementById('cancel-project-btn').addEventListener('click', () => this.toggleModal());

        document.getElementById('confirm-delete-btn').addEventListener('click', () => this.handleConfirmDelete());
        document.getElementById('cancel-delete-btn').addEventListener('click', () => this.toggleDeleteModal(false));

        document.querySelector('.menu').addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                this.handleMenuClick(e.target.textContent);
            }
        });
    },

    deleteItem(type, id) {
        this.currentDeleteType = type;
        this.currentDeleteId = id;
        this.toggleDeleteModal(true);
    },

    toggleModal(type = null, isEditing = false) {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden'); 
        });
    
        if (type === 'task') {
            document.getElementById('modal').classList.remove('hidden'); 
            this.populateProjectDropdown(); 
    
            if (!isEditing) {
                document.getElementById('task-form').reset();
            }
        } else if (type === 'project') {
            document.getElementById('project-modal').classList.remove('hidden');
            document.getElementById('project-form').reset();
        }
    },

    editTask(taskId) {
        const task = AppLogic.tasks.find(task => task.id === taskId);
    
        if (task) {
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-description').value = task.description;
            document.getElementById('task-due-date').value = task.dueDate;
            document.getElementById('task-priority').value = task.priority;
            document.getElementById('task-idProject').value = task.idProject;
    
            this.currentTaskId = taskId; 
    
            this.toggleModal('task', true);
        } else {
            console.error('Task not found!');
        }
    },

    handleTaskSubmit(e) {
        e.preventDefault();
    
        const taskData = {
            title: document.getElementById('task-title').value,
            description: document.getElementById('task-description').value,
            dueDate: document.getElementById('task-due-date').value,
            priority: document.getElementById('task-priority').value,
            idProject: document.getElementById('task-idProject').value
        };
    
        if (this.currentTaskId) {
            AppLogic.editTask(this.currentTaskId, taskData);
            this.currentTaskId = null; 
        } else {
            AppLogic.addTask(taskData);
        }
    
        this.renderTasks();
        this.toggleModal();
    },

    handleMenuClick(filter) {
        const today = new Date();

        const content = document.getElementById('content');
        content.innerHTML = ''; 

        if (filter === 'All') {
            this.renderTasks();
            return;
        }

        const tasks = AppLogic.tasks.filter(task => {
            const taskDate = parseISO(task.dueDate);

            switch (filter) {
                case 'Today':
                    return isToday(taskDate);

                case 'Week':
                    return isWithinInterval(taskDate, {
                        start: startOfWeek(today, {
                            weekStartsOn: 1
                        }),
                        end: endOfWeek(today, {
                            weekStartsOn: 1
                        })
                    });

                case 'Month':
                    const nextMonth = addMonths(today, 1);
                    return isWithinInterval(taskDate, {
                        start: startOfMonth(nextMonth),
                        end: endOfMonth(nextMonth)
                    });

                default:
                    return false;
            }
        });

        this.renderTasks(tasks);
    },

    handleProjectSubmit(e) {
        e.preventDefault();
        const projectData = {
            title: document.getElementById('project-title').value,
            description: document.getElementById('project-description').value
        };

        AppLogic.addProject(projectData);
        this.renderProjects();
        this.toggleModal();
    },

    handleConfirmDelete() {
        if (this.currentDeleteType === 'task') {
            AppLogic.deleteTask(this.currentDeleteId);
        } else {
            AppLogic.deleteProject(this.currentDeleteId);
        }
        this.renderProjects();
        this.renderTasks();
        this.toggleDeleteModal(false);
    },

    toggleDeleteModal(show = true) {
        const modal = document.getElementById('delete-modal');
        modal.classList.toggle('hidden', !show);
    },

    showProjectTasks(projectId) {
        const tasks = AppLogic.getTasksByProject(projectId);
        const project = AppLogic.projects.find(project => project.id === projectId);
    
        if (project) {
            const content = document.getElementById('content');
            content.innerHTML = `
                <div class="project-info">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                <div class="project-bar"></div>
                </div>
            `;
            this.renderTasks(tasks);
        } else {
            console.error('Project not found!');
        }
    },

    renderTasks(tasks = AppLogic.tasks) {
        const content = document.getElementById('content');
        const tasksContainer = document.createElement('div');
        tasksContainer.id = 'tasks-container';
    
        if (tasks.length === 0) {
            tasksContainer.innerHTML = '<p class="no-tasks-message">No tasks found.</p>';
        } else {
            tasksContainer.innerHTML = tasks.map(task => `
                <div class="task">
                    <div class="priority-bar ${this.getPriorityClass(task.priority)}"></div>
                    <div class="task-header">
                        <h3>${task.title}</h3>
                        <div class="task-actions">
                            <img src="./assets/delete.png" alt="Delete" onclick="DOM.deleteItem('task', '${task.id}')">
                            <img src="./assets/edit.png" alt="Edit" class="edit" onclick="DOM.editTask('${task.id}')">
                        </div>
                    </div>
                    <p>${task.description}</p>
                    <small>Due: ${task.dueDate}</small>
                </div>
            `).join('');
        }
    
        const oldTasksContainer = document.getElementById('tasks-container');
        if (oldTasksContainer) {
            oldTasksContainer.remove();
        }
    
        content.appendChild(tasksContainer);
    },

    renderProjects() {
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = AppLogic.projects.map(project => `
      <li class="project-item">
        <span onclick="DOM.showProjectTasks('${project.id}')">${project.title}</span>
        <div class="project-actions">
          <img src="./assets/delete.png" alt="Delete" onclick="DOM.deleteItem('project', '${project.id}')">
        </div>
      </li>
    `).join('');
    },

    populateProjectDropdown() {
        const select = document.getElementById('task-idProject');
        select.innerHTML = AppLogic.projects.map(project =>
            `<option value="${project.id}">${project.title}</option>`
        ).join('');
    },

    getPriorityClass(priority) {
        switch (priority.toLowerCase()) {
            case 'low':
                return 'priority-low';
            case 'medium':
                return 'priority-medium';
            case 'high':
                return 'priority-high';
            default:
                return '';
        }
    }

};