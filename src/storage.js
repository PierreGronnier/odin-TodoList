export default {
  saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  },

  loadProjects() {
    return JSON.parse(localStorage.getItem("projects")) || [];
  },

  saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },

  loadTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  },
};
