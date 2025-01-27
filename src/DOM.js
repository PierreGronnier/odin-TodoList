import { format } from "date-fns";

export function showModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
}

export function hideModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
}

export function getProjectName(idProject, projects) {
    const project = projects.find(p => p.idProject === idProject);
    return project ? project.title : "Unknown Project";
}

export function addTasksToDOM(tasks, projects) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = ""; 

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
    
        const formattedDate = format(new Date(task.dueDate), "dd MMMM yyyy");

        const projectName = getProjectName(task.idProject, projects);

        taskDiv.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Due:</strong> ${formattedDate}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Project:</strong> ${projectName}</p>
        `;

        contentDiv.appendChild(taskDiv);
    });
}

export function populateProjectDropdown(projects) {
    const dropdown = document.getElementById("task-idProject");
    dropdown.innerHTML = ""; 

    projects.forEach(project => {
        const option = document.createElement("option");
        option.value = project.idProject;
        option.textContent = project.title;
        dropdown.appendChild(option);
    });
}
