import { findTodos, addTodo, removeTodo, updateTodo } from "../todos_storage.js"
import { json } from "node:stream/consumers"

export async function index(req, res) {
    return findTodos() 
}

export async function add(req, res) {
    return addTodo(await json(req))
}

export async function remove(req, res, url) {
    await removeTodo(parseInt(url.searchParams.get('id'), 10))
    res.writeHead(204)
}

export async function update(req, res, url) {
    return updateTodo(parseInt(url.searchParams.get('id'), 10), await json(req))
}