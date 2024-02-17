import './style.css';
import { createProject, deleteProject, getAllProjects, getProjectByName } from './projectService.js';
import UI from './ui.js';

const defaultProject = createProject('Default Project');
const defaultTodo = defaultProject.addTodo(
    'Default Todo',
    'Description for this Todo goes here!',
    '01-01-2000',
    'high'
);


UI.initRender();