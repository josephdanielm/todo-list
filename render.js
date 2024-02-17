export function renderProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');

    projectsContainer.innerHTML = '';

    projects.forEach((project) => {
        const projectItem = document.createElement('div');
        projectItem.classList.add('project-item');

        projectItem.innerHTML = `
        <h1 class='project-item-title'>${project.name}</h1>
        `;

        // projectItem.addEventListener('click', () => {
        //     handleProjectClick(project);
        // });

        projectsContainer.appendChild(projectItem);

    });
}


export function renderTodos(todos) {
    const todosContainer = document.getElementById('todos-container');

    todosContainer.innerHTML = '';

    todos.forEach((todo) => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        todoItem.innerHTML = `
        <h1 class='todo-item-title'>${todo.title}</h1>
        <p class='todo-item-description'>${todo.description}</p>
        <p class='todo-item-due-date'>${todo.dueDate}</p>
        <p class='todo-item-priority'>${todo.priority}</p>
        `
        todosContainer.appendChild(todoItem);
    });
}