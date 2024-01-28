import './style.css';
import Todo from './todo.js';
import Project from './project.js';

const defaultTodo = new Todo('Default Todo', 'Description for this Todo goes here!', '01-01-2000', 'high');
const defaultProject = new Project('Default Project');


defaultProject.addTodo(defaultTodo);



console.table(defaultTodo);
console.table(defaultProject);
