import { renderTodos, renderProjects, renderTodoLogicPanel } from "./render";
import { editTodo } from "./todoService.js";
import { createProject, getAllProjects, getProjectByName } from "./projectService";
import { getCurrentProject, setCurrentProject } from "./currentProject.js";
import Project from "./project.js";

let isAddingTodo = false;


export function handleProjectClick(project) {
    console.log('Project clicked:', project.name);

    setCurrentProject(project);
    renderTodos(project.todoList);

}

let isAddingProject = false; // Add a flag to track if project addition is in progress

export function handleAddProject() {
    console.log('Adding project...');

    const addProjectBtn = document.querySelector('.add-project');

    if (!isAddingProject) {
        // Change button text to "Done" and insert input field
        addProjectBtn.textContent = 'Done';
        const inputField = document.createElement('input');
        inputField.setAttribute('type', 'text');
        inputField.setAttribute('placeholder', 'Name');
        addProjectBtn.parentNode.insertBefore(inputField, addProjectBtn);
        inputField.focus();

        isAddingProject = true;
    } else {
        const inputField = addProjectBtn.previousSibling;

        // If the input field is empty, revert back to "Add Project" button without creating a project
        if (!inputField.value.trim()) {
            addProjectBtn.textContent = 'Add Project';
            inputField.remove();
            isAddingProject = false;
            return;
        }

        // Create the project
        const createdProject = createProject(inputField.value.trim());
        renderProjects(getAllProjects());
        setCurrentProject(createdProject);
        renderTodos(getCurrentProject().todoList);
        console.log(`${getCurrentProject().name} is the current project.`)

        // Revert back to "Add Project" button
        addProjectBtn.textContent = 'Add Project';
        inputField.remove();
        isAddingProject = false;
    }
}

export function handleTodoDetailClick(element, area, todo) {
    const currentValue = element.textContent;
    const inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('placeholder', `Enter ${area}`);
    inputField.value = currentValue;

    inputField.addEventListener('blur', () => {
        const newValue = inputField.value.trim();
        if (newValue !== currentValue) {
            editTodo(todo, { [area]: newValue });
            renderTodos(getCurrentProject().todoList);
        }

        element.textContent = newValue;
        inputField.replaceWith(element);
    });

    element.replaceWith(inputField);
    inputField.focus();
}

export function handleAddTodoClick() {
    const todoLogicPanel = document.getElementById('todos-logic-panel');

    // Clear existing content
    todoLogicPanel.innerHTML = '';

    // Create input fields and dropdown for new todo details
    const titleInput = createInputField('Title');
    const descriptionInput = createInputField('Description');
    const dueDateInput = createInputField('Due Date');
    const priorityDropdown = createPriorityDropdown();

    // Create "Create todo" button
    const createTodoButton = document.createElement('div');
    createTodoButton.textContent = 'Confirm';
    createTodoButton.classList.add('confirm-todo-button');

    // Add event listener to handle "Create todo" click
    createTodoButton.addEventListener('click', handleCreateTodoClick);

    // Append input fields, dropdown, and "Create todo" button to todo logic panel
    todoLogicPanel.appendChild(titleInput);
    todoLogicPanel.appendChild(descriptionInput);
    todoLogicPanel.appendChild(dueDateInput);
    todoLogicPanel.appendChild(priorityDropdown);
    todoLogicPanel.appendChild(createTodoButton);
}

function createInputField(placeholder) {
    const inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('placeholder', placeholder);
    return inputField;
}

function createPriorityDropdown() {
    const dropdown = document.createElement('select');

    const priorityOptions = ['Low', 'Medium', 'High'];
    priorityOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option;
        dropdown.appendChild(optionElement);
    });

    return dropdown;
}

function handleCreateTodoClick() {
    const title = document.querySelector('#todos-logic-panel input[placeholder="Title"]').value;
    const description = document.querySelector('#todos-logic-panel input[placeholder="Description"]').value;
    const dueDate = document.querySelector('#todos-logic-panel input[placeholder="Due Date"]').value;
    const priority = document.querySelector('#todos-logic-panel select').value;

    // Create new todo and add it to the current project
    const currentProject = getCurrentProject();
    currentProject.addTodo(title, description, dueDate, priority);

    // Render updated todos and todo logic panel
    renderTodos(currentProject.todoList);
    renderTodoLogicPanel();

}

// Function to handle "Done" button click for todos
export function handleTodoDone(todo) {
    const currentProject = getCurrentProject();
    console.log(currentProject);
    currentProject.deleteTodo(todo); // Remove todo from the project

    // Render updated todos and todo logic panel
    renderTodos(currentProject.todoList);
    renderTodoLogicPanel();
}