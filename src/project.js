import { populateProjectDropdown, addProjectsToDOM } from "./DOM";
import { saveToLocalStorage } from "./storage";

class Project {
  constructor(idProject, title, description) {
    this.idProject = idProject;
    this.title = title;
    this.description = description;
  }
}

export function initializeProjectEvents(projects, tasks) {
  const addProjectBtn = document.getElementById("add-project-btn");
  if (addProjectBtn) {
    addProjectBtn.addEventListener("click", () => {
      console.log("Add Project Button Clicked!"); 
      const projectModal = document.getElementById("project-modal");
      if (projectModal) {
        projectModal.classList.remove("hidden");
      }
    });
  }

  const cancelProjectBtn = document.getElementById("cancel-project-btn");
  if (cancelProjectBtn) {
    cancelProjectBtn.addEventListener("click", () => {
      const projectModal = document.getElementById("project-modal");
      if (projectModal) {
        projectModal.classList.add("hidden");
      }
    });
  }

  const projectForm = document.getElementById("project-form");
  if (projectForm) {
    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("project-title").value;
      const description = document.getElementById("project-description").value;

      const project = new Project(Date.now(), title, description);
      projects.push(project);

      populateProjectDropdown(projects);
      addProjectsToDOM(projects, tasks);
      saveToLocalStorage(projects, tasks);

      const projectModal = document.getElementById("project-modal");
      if (projectModal) {
        projectModal.classList.add("hidden");
      }

      const addProjectBtn = document.getElementById("add-project-btn");
      if (addProjectBtn) {
        addProjectBtn.addEventListener("click", () => {
          console.log("Add Project Button Clicked!"); 
          const projectModal = document.getElementById("project-modal");
          if (projectModal) {
            projectModal.classList.remove("hidden");
          }
        });
      }

      e.target.reset();
    });
  }
}

export default Project;