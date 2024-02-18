import Project from './project.js';
import Todo from './todo.js';
import { renderProjects, renderTodoLogicPanel, renderTodos } from './render.js';
import { createProject, deleteProject, getAllProjects, getProjectByName } from './projectService.js';
import { getCurrentProject, setCurrentProject } from './currentProject.js';

export default class UI {

    static initRender() {
        renderProjects(getAllProjects());
        setCurrentProject(getAllProjects()[0]);
        renderTodos(getCurrentProject().todoList);
        renderTodoLogicPanel();
    }


}
