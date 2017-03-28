const http = require('http')
const pipeline = require('./server')
const server = http.createServer()
const port = process.env.PORT || 3001

server.on('request', pipeline)

server.listen(port, () => console.log(`listening on ${port}`))
