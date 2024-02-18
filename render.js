import { handleProjectClick, handleAddProject, handleTodoDetailClick, handleAddTodoClick, handleTodoDone } from "./events";
import { getCurrentProject, setCurrentProject } from "./currentProject";


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

        // Title
        const titleArea = document.createElement('div');
        titleArea.textContent = todo.title;
        titleArea.classList.add('todo-detail');
        titleArea.id = 'title-area';
        titleArea.addEventListener('click', () => {
            handleTodoDetailClick(titleArea, 'title', todo);
        });

        // Description
        const descriptionArea = document.createElement('div');
        descriptionArea.textContent = todo.description;
        descriptionArea.classList.add('todo-detail');
        descriptionArea.id = 'description-area';
        descriptionArea.addEventListener('click', () => {
            handleTodoDetailClick(descriptionArea, 'description', todo);
        });

        // Due Date
        const dueDateArea = document.createElement('div');
        dueDateArea.textContent = todo.dueDate;
        dueDateArea.classList.add('todo-detail');
        dueDateArea.id = 'due-date-area';
        dueDateArea.addEventListener('click', () => {
            handleTodoDetailClick(dueDateArea, 'dueDate', todo);
        });

        // Priority
        const priorityArea = document.createElement('div');
        priorityArea.textContent = todo.priority;
        priorityArea.classList.add('todo-detail');
        priorityArea.id = 'priority-area';
        priorityArea.addEventListener('click', () => {
            handleTodoDetailClick(priorityArea, 'priority', todo);
        });

        // Done button
        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.classList.add('todo-done-button');
        doneButton.addEventListener('click', () => {
            handleTodoDone(todo);
        });

        todoItem.appendChild(titleArea);
        todoItem.appendChild(descriptionArea);
        todoItem.appendChild(dueDateArea);
        todoItem.appendChild(priorityArea);
        todoItem.appendChild(doneButton);


        todosContainer.appendChild(todoItem);

        // todoItem.innerHTML = `
        // <h1 class='todo-item-title'>${todo.title}</h1>
        // <p class='todo-item-description'>${todo.description}</p>
        // <p class='todo-item-due-date'>${todo.dueDate}</p>
        // <p class='todo-item-priority'>${todo.priority}</p>
        // `
        // todosContainer.appendChild(todoItem);
    });
}