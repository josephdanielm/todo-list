import './style.css';
import UI from './ui.js';
import Project from './project.js';
import Todo from './todo.js';

let projectsList = [];

const defaultTodo = new Todo('Default Todo', 'Description for this Todo goes here!', '01-01-2000', 'high');
const defaultProject = new Project('Default Project');
defaultProject.addTodo(defaultTodo);
projectsList.push(defaultProject);

UI.displayProjects(projectsList);
UI.handleEditTodo(projectsList);
