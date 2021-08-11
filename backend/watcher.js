const chokidar = require('chokidar')
const { exec } = require('child_process')

let run = false
chokidar.watch('./src').on('all', (event, path) => {
  if (run) {
    exec('docker restart medications', (e, s) => {
      if (e) {
        return console.error(e)
      }

      console.log('Watcher:', s)
    })
  }
})

setTimeout(() => {
  run = true
}, 10000)

// akkor kezdi el a figyelést, amikor a medications már fut
// const ti = setInterval(() => {
//   exec('docker container ls', (e, s) => {
//     if (e) {
//       return console.error(e)
//     }
//     run = s.includes('medications')
//     console.log('Watcher - medications:', run)
//     if (run) {
//       clearInterval(ti)
//     }
//   })
// }, 1000)
