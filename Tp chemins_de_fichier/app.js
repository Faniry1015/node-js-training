import {readdir, stat} from 'node:fs/promises'

//TP récuperer les contenu du dossier, lister tous les fichiers et dossiers + poids pour fichiers

const currentDir = await readdir('./', {withFileTypes:true})
for (const item of currentDir) {
    // const {size} = await stat(item.name)
    // console.log(item.isDirectory() ? `D - ${item.name}`  : `F - ${item.name} - ${size}`)
    const parts = [
        item.isDirectory() ? 'D' : 'F',
        item.name,
    ]
    if(!item.isDirectory()) {
        const {size} = await stat(item.name)
        parts.push(`${size}o`)
    }
    console.log(parts.join(' - '))
}


