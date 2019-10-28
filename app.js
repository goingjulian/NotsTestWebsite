const express = require('express')
var readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)

const app = express()

let server
let port
let serverId
let healthy = true

app.use((req, res, next) => {
    console.log("\n== New request ==\n")
    console.log(req.headers)
    console.log("\n== End of request ==\n")
    res.header('Server', `Test server with ID: ${serverId}`)
    next()
})

app.get("/healthy", (req, res) => {
    return res.send(healthy);
})

app.post("/kill", (req, res) => {
    healthy = false
    return res.send("Server is unhealthy")
})

app.post("/revive", (req, res) => {
    healthy = true
    return res.send("Server is healthy again")
})

app.use('/', express.static(__dirname + '/public'))

console.log("Please enter the server details")

rl.setPrompt("Port number > ")
rl.prompt()

rl.on("line", line => {
    if (port == undefined) {
        port = parseInt(line)

        rl.setPrompt("Server ID > ")
        rl.prompt()
    }
    else {
        serverId = parseInt(line)

        server = app.listen(port, () => {
            console.log(`game server started on port ${server.address().port}`)
        })
    }


})

