const http = require('http')

http.createServer((req, res) => {
    res.end('Hello world')
})
.listen(5000, () => {
    console.log(`servidor online`)
})