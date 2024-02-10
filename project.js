export default class Project {
    constructor(name) {
        this.name = name;
        this.todoList = [];
    }

    addTodo(todo) {
        this.todoList.push(todo);
    }

    removeTodo(todo) {
        const todoIndex = this.todoList.indexOf(todo);
        if (todoIndex !== -1) {
            this.todos.splice(todoIndex, 1);
        }
    }

    getTodoList() {
        return this.todoList;
    }

    getCompletedTodos() {
        return this.todoList.filter(todo => todo.completed);
    }

    getPendingTodos() {
        return this.todoList.filter(todo => !todo.completed);
    }

    getTodoByTitle(title) {
        return this.todoList.find(todo => todo.title === title);
    }

    getTodoIndex(todo) {
        return this.todoList.indexOf(todo);
    }
}