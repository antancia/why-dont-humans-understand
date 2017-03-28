const http = require('http')
const pipeline = require('./server')
const server = http.createServer()
const port = process.env.PORT || 3001

server.on('request', pipeline)

server.listen(port, () => console.log(`server listening on ${port}`))
