import { readFile, writeFile } from 'node:fs/promises'

const path = './storage/todos.json'

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * @return {Promise<Todo[]>}
 */
export async function findTodos() {
    const data = await readFile(path, 'utf8')
    return JSON.parse(data)
}


/**
 * 
 * @param {string} title 
 * @param {boolean} completed 
 * @return {Promise<Todo>} 
 */
export async function createTodo({title, completed = false}) {
    const todo = {title, completed, id: Date.now()}
    const todos =[todo, ...await findTodos()]
    await writeFile(path, JSON.stringify(todos))
    return todo
}

/**
 * 
 * @param {number} id 
 * @param {Promise} id 
 */
export async function removeTodo(id) {
    const todos = await findTodos()
    await writeFile(path, JSON.stringify(todos.filter(todo => todo.id !== id)))
}