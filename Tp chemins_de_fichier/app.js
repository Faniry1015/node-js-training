import {readdir, stat} from 'node:fs/promises'

//TP récuperer les contenu du dossier, lister tous les fichiers et dossiers + poids pour fichiers

const currentDir = await readdir('./', {withFileTypes:true})
for (const item of currentDir) {
    if (item.isDirectory()) {
        console.log('D', item.name)
    } else {
        const currentItem = await stat(item.name)
        console.log('F', item.name, currentItem.size)
    }
}


