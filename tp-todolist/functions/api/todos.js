import { createTodo, findTodos, removeTodo } from "../todos_storage.js"
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

export async function remove (req, res, url) {
    const id = parseInt(url.searchParams.get('id'), 10)
    await removeTodo(id)
    res.writeHead(204)
}