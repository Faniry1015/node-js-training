import { readFile } from 'node:fs/promises'

const dataPath = './storage/todos.json'

export async function findTodos() {
    return readFile(dataPath, 'utf8')
}