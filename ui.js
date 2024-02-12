import Project from './project.js';

export default class UI {
    static displayProjects(projects) {
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = '';

        if (projects) {
            projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project-item');
                projectElement.innerHTML = `
                    <h2>${project.name}</h2>
                    <button class="btn-view-project">View Project</button>
                `;
                projectsContainer.appendChild(projectElement);
            });
        } else {
            console.error("Projects list is undefined or null.");
        }

        const addProjectButton = document.createElement('button');
        addProjectButton.textContent = 'Add New Project';
        addProjectButton.classList.add('btn-add-project');
        addProjectButton.addEventListener('click', function () {
            UI.displayAddProjectForm(projects);
        });
        projectsContainer.appendChild(addProjectButton);
    }

    static displayAddProjectForm(projects) {
        const projectsContainer = document.getElementById('projects-container');

        const formElement = document.createElement('div');
        formElement.classList.add('add-project-form');
        formElement.innerHTML = `
            <h3>Add New Project</h3>
            <label for="project-name">Project Name:</label>
            <input type="text" id="project-name" class="add-project-name"><br>
            <button class="btn-submit-project">Create Project</button>
        `;

        const addButton = formElement.querySelector('.btn-submit-project');
        addButton.addEventListener('click', function () {
            const projectName = formElement.querySelector('.add-project-name').value;
            const newProject = new Project(projectName);

            if (projects) {
                projects.push(newProject);
                UI.displayProjects(projects);
            } else {
                console.error('Projects list is undefined or null');
            }
            UI.displayProjects(projects);
        });

        projectsContainer.appendChild(formElement);
    }

    static handleEditTodo(projects) {
        document.addEventListener('click', function (event) {
            if (event.target && event.target.classList.contains('btn-view-project')) {
                const projectName = event.target.previousElementSibling.textContent.trim();
                UI.displayTodos(projectName, projects);
            } else if (event.target && event.target.classList.contains('btn-edit-todo')) {
                const todoElement = event.target.closest('.todo-item');
                todoElement.classList.add('editing-todo');
                const todoTitle = todoElement.querySelector('.todo-title').textContent;
                const todoDescription = todoElement.querySelector('.todo-description').textContent;
                const todoDueDate = todoElement.querySelector('.todo-due-date').textContent;
                const todoPriorityElement = todoElement.querySelector('.todo-priority');
                const todoPriority = todoPriorityElement.textContent.split(': ')[1];

                UI.displayEditForm(todoElement, todoTitle, todoDescription, todoDueDate, todoPriority);
            }
        });
    }

    static handleEditDone(todoElement) {
        const editedTitle = todoElement.querySelector('.edit-title').value;
        const editedDescription = todoElement.querySelector('.edit-description').value;
        const editedDueDate = todoElement.querySelector('.edit-due-date').value;
        const editedPriority = todoElement.querySelector('.edit-priority').value;

        todoElement.innerHTML = `
            <h3 class="todo-title">${editedTitle}</h3>
            <p class="todo-description">Description: ${editedDescription}</p>
            <p class="todo-due-date">Due Date: ${editedDueDate}</p>
            <p class="todo-priority">Priority: ${editedPriority}</p>
            <button class="btn-edit-todo">Edit</button>
        `;

        todoElement.classList.remove('editing-todo');
    }

    static displayAddTodoButton(projectName, projects) {
        const todosContainer = document.getElementById('todos-container');

        const addButton = document.createElement('button');
        addButton.textContent = 'Add New Todo';
        addButton.classList.add('btn-add-todo');
        addButton.addEventListener('click', function () {
            addButton.style.display = 'none'; // Hide the button when clicked
            UI.displayAddTodoForm(projectName, projects);
        });

        // Append the "Add New Todo" button to the todos container
        todosContainer.appendChild(addButton);
    }

    static displayTodos(projectName, projects) {
        const project = projects.find(project => project.name === projectName);
        const todosContainer = document.getElementById('todos-container');
        todosContainer.innerHTML = '';

        project.todoList.forEach(todo => {
            const todoElement = document.createElement('div');
            todoElement.classList.add('todo-item');
            todoElement.innerHTML = `
                <h3 class="todo-title">${todo.title}</h3>
                <p class="todo-description">Description: ${todo.description}</p>
                <p class="todo-due-date">Due Date: ${todo.dueDate}</p>
                <p class="todo-priority">Priority: ${todo.priority}</p>
                <button class="btn-edit-todo">Edit</button>
            `;
            todosContainer.appendChild(todoElement);
        });

        // Call the method to display the "Add New Todo" button
        UI.displayAddTodoButton(projectName, projects);
    }

    static displayEditForm(todoElement, title, description, dueDate, priority) {
        description = description.replace(/^description: /i, '');
        dueDate = dueDate.replace(/^due date: /i, '');

        todoElement.innerHTML = `
        <input type="text" class="edit-input edit-title" value="${title}">
        <textarea class="edit-input edit-description">${description}</textarea>
        <input type="text" class="edit-input edit-due-date" value="${dueDate}">
        <select class="edit-input edit-priority">
            <option value="low" ${priority === 'low' ? 'selected' : ''}>Low</option>
            <option value="medium" ${priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="high" ${priority === 'high' ? 'selected' : ''}>High</option>
        </select>
        <button class="btn-done-edit">Done</button>
    `;

        const doneButton = todoElement.querySelector('.btn-done-edit');
        doneButton.addEventListener('click', function () {
            UI.handleEditDone(todoElement);
        });
    }

    static displayAddTodoForm(projectName, projects) {
        const todosContainer = document.getElementById('todos-container');

        const formElement = document.createElement('div');
        formElement.classList.add('add-todo-form');
        formElement.innerHTML = `
            <h3>Add New Todo</h3>
            <label for="todo-title">Title:</label>
            <input type="text" id="todo-title" class="add-todo-title"><br>
            <label for="todo-description">Description:</label>
            <textarea id="todo-description" class="add-todo-description"></textarea><br>
            <label for="todo-due-date">Due Date:</label>
            <input type="text" id="todo-due-date" class="add-todo-due-date"><br>
            <label for="todo-priority">Priority:</label>
            <select id="todo-priority" class="add-todo-priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select><br>
            <button class="btn-submit-todo">Add Todo</button>
        `;

        const addButton = formElement.querySelector('.btn-submit-todo');
        addButton.addEventListener('click', function () {
            const title = formElement.querySelector('.add-todo-title').value;
            const description = formElement.querySelector('.add-todo-description').value;
            const dueDate = formElement.querySelector('.add-todo-due-date').value;
            const priority = formElement.querySelector('.add-todo-priority').value;

            const newTodo = {
                title: title,
                description: description,
                dueDate: dueDate,
                priority: priority
            };

            const project = projects.find(project => project.name === projectName);
            if (project) {
                project.todoList.push(newTodo);
                UI.displayTodos(projectName, projects);
            } else {
                console.error(`Project '${projectName}' not found.`);
            }

            formElement.querySelector('.add-todo-title').value = '';
            formElement.querySelector('.add-todo-description').value = '';
            formElement.querySelector('.add-todo-due-date').value = '';
            formElement.querySelector('.add-todo-priority').value = 'low';
        });

        todosContainer.appendChild(formElement);
    }
}
