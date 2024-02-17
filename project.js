import Todo from './todo.js';

export default class Project {
    constructor(name) {
        this.name = name;
        this.todoList = [];
    }

    addTodo(title, description, dueDate, priority) {
        const newTodo = new Todo(title, description, dueDate, priority);
        this.todoList.push(newTodo);
        return newTodo;
    }

    deleteTodo(todoObject) {
        const todoIndex = this.todoList.indexOf(todoObject);
        if (todoIndex !== -1) {
            this.todoList.splice(todoIndex, 1);
        }
    }

    getTodoList() {
        return this.todoList;
    }

    getTodoByTitle(title) {
        return this.todoList.find(todo => todo.title === title);
    }

    getCompletedTodos() {
        return this.todoList.filter(todo => todo.completed);
    }

    getUncompletedTodos() {
        return this.todoList.filter(todo => !todo.completed);
    }
}