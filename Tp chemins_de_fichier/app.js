import { readdir, stat } from 'node:fs/promises'

//TP récuperer les contenu du dossier, lister tous les fichiers et dossiers + poids pour fichiers

const currentDir = await readdir('./', { withFileTypes: true })
// for (const item of currentDir) {
// const {size} = await stat(item.name)
// console.log(item.isDirectory() ? `D - ${item.name}`  : `F - ${item.name} - ${size}`)

//Pas très performant car on est obligé d'attendre le await du stat avant de faire les opérations suivantes
// const parts = [
//     item.isDirectory() ? 'D' : 'F',
//     item.name,
// ]
// if(!item.isDirectory()) {
//     const {size} = await stat(item.name)
//     parts.push(`${size}o`)
// }
// console.log(parts.join(' - '))
// }
console.time('code')
await Promise.allSettled(
    currentDir.map(async (item) => {
        const parts = [
            item.isDirectory() ? 'D' : 'F',
            item.name,
        ]
        if (!item.isDirectory()) {
            const { size } = await stat(item.name)
            parts.push(`${size}o`)
        }
        console.log(parts.join(' - '))
    })
)
console.timeEnd('code')


