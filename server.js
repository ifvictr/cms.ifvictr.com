const fs = require('fs')
const ghost = require('ghost')

// Run a single Ghost process
ghost()
    .then(server => server.start())
    .then(() => {
        // Tell Nginx that Ghost is ready to receive traffic
        const fd = fs.openSync('/tmp/app-initialized', 'w')
        fs.closeSync(fd)
    })
    .catch(e => {
        console.error(`Ghost server error: ${e.message} ${e.stack}`)
        process.exit(1)
    })
