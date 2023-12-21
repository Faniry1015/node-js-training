import { open, readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { json, text } from 'node:stream/consumers'

const server = createServer(async (req, res) => {
    const dir = dirname(fileURLToPath(import.meta.url))
    const todosPath = join(dir, 'storage/todos.json')
    let todosArray = JSON.parse(await readFile(todosPath, 'utf8'))
    const newTodo = await json(req)
    if(req.method === 'GET' && req.url === '/todos') {
        const todosRead = await readFile(todosPath)
        res.write(todosRead)
    } else if (req.method === 'POST' && req.url === '/todos') {
        todosArray.push(newTodo)
        await writeFile(todosPath, JSON.stringify(todosArray))
    } else if (req.method === 'PUT' && req.url.startsWith('/todos')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const currentTodoId = parseInt(url.searchParams.get('id'))
        todosArray = todosArray.map((todo) => {
            if (todo.id === currentTodoId) {
                return todo = {
                    id: currentTodoId,
                    ...newTodo
                }
            } else {
                return todo
            }
        })
        await writeFile(todosPath, JSON.stringify(todosArray))
    }
    res.end()
})

server.listen('8000')
