import { createTodo, findTodos } from "../todos_storage.js"
import { json } from 'node:stream/consumers'

export async function index (req, res) {
    const todos = await findTodos()
    return todos
}

export async function create (req, res) {
    const newTodo = await json(req)
    const todo = await createTodo(newTodo)
    return todo
} 