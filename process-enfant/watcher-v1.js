//En résumé, ce script crée un processus Node.js et surveille les changements dans le répertoire courant. Chaque fois qu'un fichier JavaScript est modifié, le processus Node.js est tué et un nouveau processus est lancé. Cela peut être utile lors du développement pour automatiser le redémarrage d'une application Node.js lors de modifications de code.
import {spawn} from 'node:child_process' 
import {watch} from 'node:fs/promises'
//est utilisée pour créer un nouveau processus, tandis que la fonction watch est utilisée pour surveiller les changements dans un répertoire.

const [node, _, file] = process.argv
//extrait les trois premiers éléments de process.argv, qui représentent respectivement le chemin de l'exécutable Node.js (node), le chemin du script en cours d'exécution (_), et le nom du fichier à exécuter (file).

function spawnNode() {
    const proc = spawn(node, [file]) //spawn pour créer un nouveau processus Node.js avec le fichier spécifié. Elle configure des écouteurs d'événements pour gérer la sortie standard, la sortie d'erreur, et la fermeture du processus.
    proc.stdout.on('data', (data) => {
        console.log(data.toString('utf8'))
    })
    
    proc.stderr.on('data', (data) => {
        console.error(data.toString('utf8'))
    })
    
    proc.on('close', (code) => {
        if (code > 0) {
            throw new Error(`Process exited : ${code}`)
        }
    })

    return proc
}

let childNodeProcess= spawnNode()
const watcher = watch('./', {recursive: true})
//À chaque changement détecté (un événement), le script vérifie si le fichier modifié a une extension .js. Si c'est le cas, le processus Node.js en cours est tué (kill()), et un nouveau processus est lancé en appelant la fonction spawnNode.
for await (const event of watcher) {
    if (event.filename.endsWith('.js')) {
        childNodeProcess.kill()
        childNodeProcess = spawnNode()
    }
}
