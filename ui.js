import Project from './project.js';
import Todo from './todo.js';
import { renderProjects, renderTodos } from './render.js';
import { createProject, deleteProject, getAllProjects, getProjectByName } from './projectService.js';

export default class UI {

    static initRender() {
        renderProjects(getAllProjects());
        renderTodos(getAllProjects()[0].todoList);
    }


}
