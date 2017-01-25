// Declarations
var express = require('express')
var app = express()

// Middleware
app.use(express.static('public'))
app.use(express.static('files'))

// Routing
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

// Server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
