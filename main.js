import './style.css';
import Todo from './todo.js';
import Project from './project.js';
import UI from './ui.js';

const defaultTodo = new Todo('Default Todo', 'Description for this Todo goes here!', '01-01-2000', 'high');
const defaultProject = new Project('Default Project');
const projectsList = [];


defaultProject.addTodo(defaultTodo);

projectsList.push(defaultProject);

UI.displayProjects(projectsList);

document.addEventListener('DOMContentLoaded', function () {
  const todosContainer = document.getElementById('todos-container');

  // Event delegation for edit and delete buttons
  todosContainer.addEventListener('click', function (event) {
    const targetButton = event.target;

    if (targetButton.classList.contains('edit-todo-button')) {
      const todoTitle = targetButton.getAttribute('data-todo-title');
      UI.editTodo(todoTitle);
    } else if (targetButton.classList.contains('delete-todo-button')) {
      const todoTitle = targetButton.getAttribute('data-todo-title');
      UI.deleteTodo(todoTitle);
    }
  });
});