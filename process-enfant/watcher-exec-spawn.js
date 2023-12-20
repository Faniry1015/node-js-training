//Deux manière : exec ou spawn
import {exec, spawn} from 'node:child_process' 
// exec :Permet d'exécuter des opérations complexes sur le système (ex conversion vidéo)
// spawn : Permet de lancer un processus enfant et d'écouter ce qui se passe dessus

exec('dir', (error, out, err) => { //"dir" (qui est une commande Windows pour lister le contenu d'un répertoire)
    console.log({
        error,
        out,
        err
    })
})
/* En console  node watcher.js app.js  */

const proc = spawn('dir', [], {shell: true})
proc.stdout.on('data', (data) => {
    console.log(data.toString('utf8'))
})

proc.stderr.on('data', (data) => {
    console.error(data.toString('utf8'))
})

proc.on('close', (code) => {
    console.log(`Process exited : ${code}`)
})