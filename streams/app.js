// Pour des fichiers lourds, permet de lire progressivement et controler l'état. les streams (flux) sont une abstraction puissante qui permet de traiter les opérations de lecture et d'écriture de manière efficace, en particulier lorsqu'il s'agit de manipuler de grandes quantités de données.

import { createReadStream, createWriteStream } from 'node:fs'
import { stat } from 'node:fs/promises'

const stream = createReadStream('video-skaiz.mp4') //lire le fichier video
const {size} = await stat('video-skaiz.mp4')
let read = 0
stream.on('data', (chunk) => { //chunk = fragment ; foo = pour représenter une valeur ou une variable lorsqu'un nom spécifique n'est pas important dans un contexte particulier. 
    read += chunk.length //.length : taille du fichier en octet
    console.log(Math.round(read * 100 / size)) //Pourcentage de données lu
})
stream.on('close', () => {
    console.log('close')
})

//cas concret d'utilisation : copie de données d'un disque rapide vers lent. Permet de ne lire les données que lorsque le disque lent est prêt pour copier la suite (système de pipe)
//Plus performant car on est pas obligé de garder en mémoire tout l'entièreté du fichier mais seulement par fragment
const writeStream = createWriteStream('video-skaiz-copy.mp4') //écrire (copier) le fichier video
stream.pipe(writeStream)
