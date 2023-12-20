//http response 
import { createReadStream } from 'node:fs'
import { createServer } from 'node:http'

const server = createServer((req, res) => {
    const file = createReadStream('index.html') //Afficher le contenu du index.html dans le navigateur
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    file.pipe(res, {end: false})
    file.on('end', () => {
        res.end()
    })
})

server.listen('8888')