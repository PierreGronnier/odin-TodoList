import {
  format,
  addDays,
  addMonths
} from 'date-fns';
import DOM from './DOM.js';
import AppLogic from './appLogic.js';
import Project from './project.js';
import Task from './task.js';
import "./styles.css";

window.DOM = DOM;

document.addEventListener('DOMContentLoaded', () => {
  DOM.initEventListeners();
  DOM.renderProjects();
  DOM.renderTasks();

  const defaultProjectTitle = "Starter Project";
  const defaultProjectExists = AppLogic.projects.some(project => project.title === defaultProjectTitle);

  if (!defaultProjectExists) {
      const defaultProject = AppLogic.addProject(new Project(defaultProjectTitle, "Default description"));

      AppLogic.addTask(new Task(
          "Complete the project",
          "Finish the TODO list project by implementing all features.",
          format(new Date(), 'yyyy-MM-dd'),
          "High",
          defaultProject.id
      ));

      AppLogic.addTask(new Task(
          "Learn JavaScript",
          "Deepen your understanding of JavaScript and ES6+ features.",
          format(addDays(new Date(), 3), 'yyyy-MM-dd'),
          "Medium",
          defaultProject.id
      ));

      AppLogic.addTask(new Task(
          "Read a book",
          "Read a new book to improve your knowledge.",
          format(addDays(new Date(), 10), 'yyyy-MM-dd'),
          "Low",
          defaultProject.id
      ));

      AppLogic.addTask(new Task(
          "Start a new hobby",
          "Pick up a new hobby to keep yourself entertained.",
          format(addMonths(new Date(), 1), 'yyyy-MM-dd'),
          "Medium",
          defaultProject.id
      ));
  }
});