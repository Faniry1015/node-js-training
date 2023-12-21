import { open, readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { json, text } from 'node:stream/consumers'

const server = createServer(async (req, res) => {
    const dir = dirname(fileURLToPath(import.meta.url))
    const todosPath = join(dir, 'storage/todos.json')
    if(req.method === 'GET' && req.url === '/todos') {
        const todosRead = await readFile(todosPath)
        res.write(todosRead)
    } else if (req.method === 'POST' && req.url === '/todos') {
        const newTodo = await json(req)
        const todosArray = JSON.parse(await readFile(todosPath, 'utf8'))
        todosArray.push(newTodo)
        await writeFile(todosPath, todosArray)
        res.write(todosPath)
    }
    res.end()
})

server.listen('8000')
