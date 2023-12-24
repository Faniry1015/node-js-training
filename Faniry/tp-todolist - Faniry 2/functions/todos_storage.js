import { readFile, writeFile } from 'node:fs/promises'

const dataPath = './storage/todos.json'

export async function findTodos() {
    return readFile(dataPath, 'utf8')
}

export async function addTodos({title, completed = false}) {
    const todo = {title, completed, id: Date.now()}
    const todosArray = JSON.parse(await findTodos())
    todosArray.push(todo)
    writeFile(dataPath, JSON.stringify(todosArray, null, 2))
    return JSON.stringify(todo)
}