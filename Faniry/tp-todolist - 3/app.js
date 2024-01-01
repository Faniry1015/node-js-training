import { textFieldClasses } from '@mui/material'
import { createServer } from 'node:http'
import { json, text } from 'node:stream/consumers'

const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    console.log(req.method)
    console.log(url.searchParams.get('id'))
    const currentTodo = await text(req)
    res.write(currentTodo, 'utf-8')
    res.end()
})

server.listen('8000')