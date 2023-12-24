import { readFile, writeFile } from 'node:fs/promises'

const dataPath = './storage/todos.json'

export async function findTodos() {
    return JSON.parse(await readFile(dataPath, 'utf8'))
}

export async function addTodo({title, completed = false}) {
    const todo = {title, completed, id: Date.now()}
    const todos = [todo, ...await findTodos()]
    writeFile(dataPath, JSON.stringify(todos, null, 2))
    return todo
}

export async function removeTodo(id) {
    let todos = await findTodos()
    todos = todos.filter(todo => todo.id !== id)
    writeFile(dataPath, JSON.stringify(todos, null, 2))
}

export async function updateTodo(id, partialTodo) { 
    const todos = await findTodos()
    const todo = todos.find(todo => todo.id === id)
    Object.assign(todo, partialTodo)
    writeFile(dataPath, JSON.stringify(todos, null, 2))
    return todo
}