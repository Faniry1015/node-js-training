import { readFile, writeFile, unlink, copyFile } from'node:fs/promises' 
//unlink pour supprimer, autres sont évidents / /promises peut être enlever pour ne pas utiliser de promises. Ajouter Sync (ex: readFileSync) pour utiliser des fonctions synchrones

async function writeContent() {
    await writeFile('demo.txt', 'Je suis le text ajouter', {
        flag: 'a' // pour ne pas supprimer le contenu déjà existant
    })
} 

writeContent()

const content = await readFile('demo.txt', {encoding: 'utf8'})
console.log(content)

async function deletefile () {
    try {
        await unlink('delete.js')
        console.log('fichier supprimer')
    } catch(e) {
        throw new Error('Le fichier à sans doute déjà été supprimer', console.log(e.message))
    }
}

deletefile()