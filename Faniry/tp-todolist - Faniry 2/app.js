import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { index } from './functions/api/todos.js'

const server = createServer( async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const method = req.method
    const endpoint = `${method}:${url.pathname}`
    switch (endpoint) {
        case 'GET:/todos':
            res.write(await index(req,res))
            break;
        case 'POST:/todos':
            res.write(await index(req,res))
            break;
        default:
            break;
    }
    res.end()
})

server.listen('8000')