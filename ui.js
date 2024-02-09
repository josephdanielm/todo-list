export default class UI {

    static displayTodos(project) {
        const todosContainer = document.getElementById('todos-container');
        todosContainer.innerHTML = ''; // Clear the container

        project.getTodoList().forEach(todo => {
            const todoElement = document.createElement('div');
            todoElement.innerHTML = `
        <h3>${todo.title}</h3>
        <p>Description: ${todo.description}</p>
        <p>Due Date: ${todo.dueDate}</p>
        <p>Priority: ${todo.priority}</p>
        <button class="edit-todo-button">Edit</button>
        <button class="delete-todo-button")">Delete</button>
      `;
            todosContainer.appendChild(todoElement);
        });
    }

    static displayProjects(projects) {
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = ''; // Clear the container

        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.innerHTML = `
            <h2>${project.name}</h2>
            <button onclick="UI.displayTodos('${project.name}')">View Project</button>
          `;
            projectsContainer.appendChild(projectElement);
        });
    }
}