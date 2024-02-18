export function editTodo(todo, newDetails) {
    Object.assign(todo, newDetails);
    console.log(`Todo "${todo.title}" edited.`);
}