import { findTodos, addTodos } from "../todos_storage.js"
import { json } from "node:stream/consumers"

export async function index(req, res) {
    return findTodos() 
}

export async function add(req, res) {
    return addTodos(await json(req))
}