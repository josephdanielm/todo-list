import Project from './project.js';

export default class UI {

    static displayProjects(projects) {
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = ''; // Clear the container

        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.innerHTML = `
            <h2>${project.name}</h2>
            <button class="btn-view-project">View Project</button>
          `;
            projectsContainer.appendChild(projectElement);
        });
    }

    static handleEditTodo(projectsList) {
        document.addEventListener('click', function (event) {
            if (event.target && event.target.classList.contains('btn-view-project')) {
                const projectName = event.target.previousElementSibling.textContent.trim();
                UI.displayTodos(projectName, projectsList);
            } else if (event.target && event.target.classList.contains('btn-edit-todo')) {
                const todoElement = event.target.closest('.todo-item');
                const todoTitle = todoElement.querySelector('.todo-title').textContent;
                const todoDescription = todoElement.querySelector('.todo-description').textContent;
                const todoDueDate = todoElement.querySelector('.todo-due-date').textContent;
                const todoPriorityElement = todoElement.querySelector('.todo-priority');
                // Extract priority value from the priority element
                const todoPriority = todoPriorityElement.textContent.split(': ')[1]; // Assuming format is "Priority: high"

                UI.displayEditForm(todoElement, todoTitle, todoDescription, todoDueDate, todoPriority);
            }
        });
    }

    static handleEditDone(todoElement) {
        const editedTitle = todoElement.querySelector('.edit-title').value;
        const editedDescription = todoElement.querySelector('.edit-description').value;
        const editedDueDate = todoElement.querySelector('.edit-due-date').value;
        const editedPriority = todoElement.querySelector('.edit-priority').value;

        // Update the todo item properties with the new values
        todoElement.innerHTML = `
            <h3 class="todo-title">${editedTitle}</h3>
            <p class="todo-description">Description: ${editedDescription}</p>
            <p class="todo-due-date">Due Date: ${editedDueDate}</p>
            <p class="todo-priority">Priority: ${editedPriority}</p>
            <button class="btn-edit-todo">Edit</button>
        `;
    }

    static displayTodos(projectName, projectsList) {
        const project = projectsList.find(project => project.name === projectName);
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

        // Adding button to add new todo
        const addButton = document.createElement('button');
        addButton.textContent = 'Add New Todo';
        addButton.classList.add('btn-add-todo');
        addButton.addEventListener('click', function () {
            UI.displayAddTodoForm(projectName, projectsList);
        });
        todosContainer.appendChild(addButton);
    }

    static displayEditForm(todoElement, title, description, dueDate, priority) {
        console.log("Priority received in displayEditForm:", priority);

        // Extracting user-provided values from description and dueDate
        description = description.replace(/^description: /i, ''); // Remove leading "description: "
        dueDate = dueDate.replace(/^due date: /i, ''); // Remove leading "due date: "

        // Creating the edit form HTML
        todoElement.innerHTML = `
        <label for="edit-title">Title:</label>
        <input type="text" id="edit-title" class="edit-title" value="${title}"><br>
        <label for="edit-description">Description:</label>
        <textarea id="edit-description" class="edit-description">${description}</textarea><br>
        <label for="edit-due-date">Due Date:</label>
        <input type="text" id="edit-due-date" class="edit-due-date" value="${dueDate}"><br>
        <label for="edit-priority">Priority:</label>
        <select id="edit-priority" class="edit-priority">
            <option value="low" ${priority === 'low' ? 'selected' : ''}>Low</option>
            <option value="medium" ${priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="high" ${priority === 'high' ? 'selected' : ''}>High</option>
        </select><br>
        <button class="btn-done-edit">Done</button>
    `;


        // Selecting the correct priority option
        const priorityDropdown = todoElement.querySelector('.edit-priority');
        console.log("Priority dropdown:", priorityDropdown);
        console.log("Priority dropdown before setting value:", priorityDropdown.value);
        priorityDropdown.value = priority;
        console.log("Priority dropdown value after setting:", priorityDropdown.value);

        // Adding event listener for the "Done" button
        const doneButton = todoElement.querySelector('.btn-done-edit');
        doneButton.addEventListener('click', function () {
            UI.handleEditDone(todoElement);
        });
    }

    static displayAddTodoForm(projectName, projectsList) {
        const todosContainer = document.getElementById('todos-container');

        const formElement = document.createElement('div');
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

            // Create a new todo object
            const newTodo = {
                title: title,
                description: description,
                dueDate: dueDate,
                priority: priority
            };

            // Find the project in the projectsList
            const project = projectsList.find(project => project.name === projectName);
            if (project) {
                // Add the new todo to the project's todo list
                project.todoList.push(newTodo);
                // Update the display of todos in the todosContainer
                UI.displayTodos(projectName, projectsList);
            } else {
                console.error(`Project '${projectName}' not found.`);
            }

            // Clear the form fields
            formElement.querySelector('.add-todo-title').value = '';
            formElement.querySelector('.add-todo-description').value = '';
            formElement.querySelector('.add-todo-due-date').value = '';
            formElement.querySelector('.add-todo-priority').value = 'low'; // Reset priority to low
        });

        todosContainer.appendChild(formElement);
    }

}



