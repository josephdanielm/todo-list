import './style.css';
import { createProject, deleteProject, getAllProjects, getProjectByName } from './projectService.js';



const defaultProject = createProject('Default Project');

const defaultTodo = defaultProject.addTodo(
    'Default Todo',
    'Description for this Todo goes here!',
    '01-01-2000',
    'high'
);



console.table(getAllProjects());

deleteProject(defaultProject);

console.table(getAllProjects());