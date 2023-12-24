import { readFile, writeFile } from 'node:fs/promises'
import { NotFoundError } from './errors.js'

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
    const todos = await findTodos()
    const todoIndex = todos.findIndex(todo => todo.id === id)
    if (todoIndex === -1) {
        throw new NotFoundError()
    }
    writeFile(dataPath, JSON.stringify(todos.filter(todo => todo.id !== id), null, 2))
}

export async function updateTodo(id, partialTodo) { 
    const todos = await findTodos()
    const todo = todos.find(todo => todo.id === id)
    if (todo === undefined) {
        throw new NotFoundError()
    }
    Object.assign(todo, partialTodo)
    writeFile(dataPath, JSON.stringify(todos, null, 2))
    return todo
}