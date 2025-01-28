import { format } from "date-fns";

export function getProjectName(idProject, projects) {
  const project = projects.find((p) => p.idProject === parseInt(idProject, 10));
  return project ? project.title : "Unknown Project";
}

export function addTasksToDOM(tasks, projects, projectId) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = ""; 

  const project = projects.find((p) => p.idProject === projectId);

  if (project) {
    const projectDescriptionDiv = document.createElement("div");
    projectDescriptionDiv.classList.add("project-description");
    projectDescriptionDiv.innerHTML = `
      <h2>${project.title}</h2>
      <p>${project.description}</p>
    `;
    contentDiv.appendChild(projectDescriptionDiv);
  }

  if (tasks.length > 0) {
    tasks.forEach((task) => {
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
  } else {
    const noTasksMessage = document.createElement("p");
    noTasksMessage.textContent = "No tasks found for this project.";
    noTasksMessage.classList.add("no-tasks-message");
    contentDiv.appendChild(noTasksMessage);
  }
}
export function populateProjectDropdown(projects) {
  const dropdown = document.getElementById("task-idProject");
  dropdown.innerHTML = "";

  projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.idProject;
    option.textContent = project.title;
    dropdown.appendChild(option);
  });
}

export function addProjectsToDOM(projects, tasks) {
  const projectList = document.getElementById("project-list");
  if (!projectList) return;

  projectList.innerHTML = "";

  projects.forEach((project) => {
    const projectItem = document.createElement("li");
    projectItem.textContent = project.title;
    projectItem.addEventListener("click", () => {
      const filteredTasks = tasks.filter((task) => task.idProject === project.idProject);
      addTasksToDOM(filteredTasks, projects, project.idProject);
    });
    projectList.appendChild(projectItem);
  });

  const addProjectBtn = document.getElementById("add-project-btn");
  if (addProjectBtn) {
    addProjectBtn.addEventListener("click", () => {
      const projectModal = document.getElementById("project-modal");
      if (projectModal) {
        projectModal.classList.remove("hidden");
      }
    });
  }
}