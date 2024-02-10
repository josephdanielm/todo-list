import './style.css';
import UI from './ui.js';
import Project from './project.js';
import Todo from './todo.js';


const defaultTodo = new Todo('Default Todo', 'Description for this Todo goes here!', '01-01-2000', 'high');
const defaultProject = new Project('Default Project');
defaultProject.addTodo(defaultTodo);
const projectsList = [defaultProject];


UI.displayProjects(projectsList);
UI.handleEditTodo(projectsList);

function handleEditDone(todoElement) {
  const editedTitle = todoElement.querySelector('.edit-title').value;
  const editedDescription = todoElement.querySelector('.edit-description').value;
  const editedDueDate = todoElement.querySelector('.edit-due-date').value;
  const editedPriority = todoElement.querySelector('.edit-priority').value;

  // Update the todo item properties with the new values
  todoElement.innerHTML = `
      <h3 class="todo-title">${editedTitle}</h3>
      <p class="todo-description">Description: ${editedDescription}</p>
      <p class="todo-due-date">Due Date: ${editedDueDate}</p>
      <p class="todo-priority">Priority: ${editedPriority}</p>
      <button class="btn-edit-todo">Edit</button>
  `;
}

UI.handleEditDone = handleEditDone;