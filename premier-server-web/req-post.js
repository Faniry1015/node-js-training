//envoyer des données via insomnia

import { createServer } from 'node:http'
import { text, json } from 'node:stream/consumers'
const server = createServer(async (req, res) => {
    const data = await json(req)
    console.log(data) //permet de recevoir des données depuis insomnia et l'affiche en console par la méthode POST (si je ne sais pas de quel type il est je peux remplacer json par text)
    res.write(`Bonjour ${data.name} tu as ${data.age}ans`) //A condition d'envoyer un json avec name et age
    res.end()
})

server.listen('8000')