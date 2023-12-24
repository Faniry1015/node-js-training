import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { add, index, remove, update } from './functions/api/todos.js'

const server = createServer( async (req, res) => {
    res.writeHead(200, {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    })
    const url = new URL(req.url, `http://${req.headers.host}`)
    const method = req.method
    const endpoint = `${method}:${url.pathname}`
    switch (endpoint) {
        case 'GET:/todos':
            res.write(JSON.stringify(await index(req, res)))
            break;
        case 'POST:/todos':
            res.write(JSON.stringify(await add(req, res)))
            break;
        case 'DELETE:/todos':
            remove(req,res, url)
            break;
        case 'PUT:/todos':
            res.write(JSON.stringify(await update(req,res, url)))
            break
        default:
            throw new Error('requête inconnu')
    }
    res.end()
})

server.listen('8000')