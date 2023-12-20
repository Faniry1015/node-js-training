import { createServer } from 'node:http'

createServer((req, res) => {
    res.write('Bonjour les gens ')
    res.write('Comment aller vous')
    console.log('refresh')
    res.end()
}).listen('8000')