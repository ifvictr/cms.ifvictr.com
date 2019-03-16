const cluster = require('cluster')
const ghost = require('ghost')

// Heroku sets `WEB_CONCURRENCY` to the number of available processor cores.
const WORKERS = process.env.WEB_CONCURRENCY || 1

if (cluster.isMaster) {
    // Master starts all workers and restarts them when they exit.
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Starting a new worker because PID: ${worker.process.pid} exited code ${code} from ${signal} signal.`)
        cluster.fork()
    })
    for (let i = 0; i < WORKERS; i++) {
        cluster.fork()
    }
}
else {
    // Run Ghost in each worker/processor core.
    ghost().then(server => server.start())
}