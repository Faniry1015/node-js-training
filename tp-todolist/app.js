import { createServer } from 'node:http'
import { create, index, remove } from './functions/api/todos.js'

const server = createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const url = new URL(req.url, `http://${req.headers.host}`)
    const endpoint = `${req.method}:${url.pathname}`
    let results
    switch (endpoint) {
        case 'GET:/todos':
            results = await index(req, res)
            break;
        case 'POST:/todos':
            results = await create(req, res)
            break;
        case 'DELETE:/todos':
            results = await remove(req, res, url) 
            break;
        default: res.writeHead(404)
    }
    if (results) {
        res.write(JSON.stringify(results))
    }

    res.end()
})

server.listen('8000')
