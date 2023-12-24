import { findTodos } from "../todos_storage.js"

export async function index(req, res) {
    return findTodos() 
}