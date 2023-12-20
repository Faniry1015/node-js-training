//http Request
import { createServer } from 'node:http'

const server = createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`) //Crée un objet url (chemin (sans nom de domaine), nom de domaine)
    console.log(url) // Objet avec plusieurs propriétés
    console.log(req.url) //donne le chemin (SANS LE NOM DE DOMAINE)
    res.write(`Bonjour ${url.searchParams.get('name')}`) // supposons qu'il y a un paramettre 'name' dans l'url. searchParams permet d'écrire bonjour + nom de l'user dans le navigateur
    res.end()
})

server.listen('8888')