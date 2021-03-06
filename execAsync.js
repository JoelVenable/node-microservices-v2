const { exec } = require('child_process')


const execAsync = async (command) => new Promise((res, rej) => {
    const process = exec(command, (err, stdout, stderr) => {
        if (err) {
            console.log(`error: ${err.message}`)
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return;
        }

        console.log(stdout)
    })

    process.on('exit', (code, signal) => {

        if (code === 0) res()
        else {
            console.log(`exit code: ${code}`)
            console.log('signal: ', signal)
            rej()
        }
    })
})

module.exports = execAsync;
