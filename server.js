const ghost = require('ghost')

// Run a single Ghost process
ghost()
    .then(ghostServer => ghostServer.start())
    .catch(e => {
        console.error(`Ghost server error: ${e.message} ${e.stack}`)
        process.exit(1)
    })