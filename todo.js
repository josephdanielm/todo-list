export default class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    editDescription(newDescription) {
        this.description = newDescription;
    }

    editDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    editTitle(newTitle) {
        this.title = newTitle;
    }

    editPriority(newPriority) {
        this.priority = newPriority;
    }

    markCompleted() {
        this.completed = true;
        console.log(`${this.title} has been completed`);
    }
}