import { handleProjectClick, handleAddProject, handleTodoDetailClick, handleAddTodoClick, handleTodoDone } from "./events";
import { getCurrentProject } from "./currentProject";

export function renderProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');

    projectsContainer.innerHTML = '';

    projects.forEach((project) => {
        const projectItem = document.createElement('div');
        projectItem.classList.add('project-item');

        projectItem.innerHTML = `
        <h1 class='project-item-title'>${project.name}</h1>
        `;

        projectItem.addEventListener('click', () => {
            handleProjectClick(project);
        });

        projectsContainer.appendChild(projectItem);

    });

    const addProject = document.createElement('div');
    addProject.textContent = 'Add Project';
    addProject.classList.add('add-project');
    addProject.addEventListener('click', () => {
        handleAddProject();
    })

    projectsContainer.appendChild(addProject);
}

export function renderTodoLogicPanel() {
    const todoLogicPanel = document.getElementById('todos-logic-panel');

    // Clear existing content
    todoLogicPanel.innerHTML = '';

    // Create "Add todo" div
    const addTodoDiv = document.createElement('div');
    addTodoDiv.textContent = '+';
    addTodoDiv.classList.add('add-todo-button');

    // Add event listener to handle "Add todo" click
    addTodoDiv.addEventListener('click', handleAddTodoClick);

    // Append "Add todo" div to todo logic panel
    todoLogicPanel.appendChild(addTodoDiv);
}

export function renderTodos(todos) {
    const todosContainer = document.getElementById('todos-container');

    todosContainer.innerHTML = '';

    todos.forEach((todo) => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const titleArea = createTodoDetailElement(todo.title, 'title', todo);
        const descriptionArea = createTodoDetailElement(todo.description, 'description', todo);
        const dueDateArea = createTodoDetailElement(todo.dueDate, 'dueDate', todo);
        const priorityArea = createTodoDetailElement(todo.priority, 'priority', todo);

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.classList.add('todo-done-button');
        doneButton.addEventListener('click', () => {
            handleTodoDone(todo);
        });

        appendTodoDetail(todoItem, titleArea);
        appendTodoDetail(todoItem, descriptionArea);
        appendTodoDetail(todoItem, dueDateArea);
        appendTodoDetail(todoItem, priorityArea);
        appendTodoDetail(todoItem, doneButton);

        todosContainer.appendChild(todoItem);
    });
}

function createTodoDetailElement(content, area, todo) {
    const detailArea = document.createElement('div');
    detailArea.textContent = content;
    detailArea.classList.add('todo-detail');
    detailArea.id = `${area}-area`;
    detailArea.addEventListener('click', () => {
        handleTodoDetailClick(detailArea, area, todo);
    });
    return detailArea;
}

function appendTodoDetail(todoItem, detailArea) {
    todoItem.appendChild(detailArea);
}
