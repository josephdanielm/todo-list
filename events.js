import { renderTodos, renderProjects } from "./render";
import { createProject } from "./projectService";
import { getAllProjects } from "./projectService";

export function handleProjectClick(project) {
    console.log('Project clicked:', project.name);

    renderTodos(project.todoList);

}

export function handleAddProject() {
    console.log('Adding project...');

    const addProjectBtn = document.querySelector('.add-project');
    const projectNameInput = document.createElement('input');
    projectNameInput.setAttribute('type', 'text');
    projectNameInput.setAttribute('placeholder', 'Name');

    addProjectBtn.textContent = 'Done';
    addProjectBtn.removeEventListener('click', handleAddProject);

    addProjectBtn.addEventListener('click', () => {
        const inputValue = projectNameInput.value.trim();

        if (inputValue) {
            createProject(inputValue);
            renderProjects(getAllProjects());
        }

    });

    addProjectBtn.parentNode.insertBefore(projectNameInput, addProjectBtn);
}