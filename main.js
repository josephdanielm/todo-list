import './style.css';
import UI from './ui.js';
import Project from './project.js';
import { writeProjectsToLocal, createProject } from './projectService.js';
import { storageAvailable, writeToLocalStorage, readFromLocalStorage } from './storage.js';
import { setCurrentProject } from './currentProject.js';


if (!localStorage.getItem("projects")) {
    console.log("no project storage");
    const defaultProject = createProject('Default Project');
    defaultProject.addTodo(
        'Default Todo',
        'Description for this Todo goes here!',
        '01-01-2000',
        'high'
    );
    setCurrentProject(defaultProject);

} else {
    console.log(`Project storage: ${readFromLocalStorage("projects")}`);

    const existingProjectsData = readFromLocalStorage("projects");
    console.log(existingProjectsData);

    existingProjectsData.forEach(projectData => {
        const newProject = createProject(projectData.name);

        projectData.todoList.forEach(todoData => {
            newProject.addTodo(
                todoData.title,
                todoData.description,
                todoData.dueDate,
                todoData.priority
            );
        });
    });
}

UI.initRender();