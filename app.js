import { readFile, writeFile, unlink, copyFile } from'node:fs/promises' //unlink pour supprimer, autres sont évidents

async function writeContent() {
    await writeFile('demo.txt', 'Je suis le text ajouter', {
        flag: 'a' // pour ne pas supprimer le contenu déjà existant
    })
} 

writeContent()

const content = await readFile('demo.txt', {encoding: 'utf8'})

console.log(content)