import {readdir} from 'node:fs/promises'

//TP récuperer les contenu du dossier, lister tous les fichiers et dossiers + poids pour fichiers

const currentDir = await readdir('./')
for (const item of currentDir) {
    console.log(item)
}


