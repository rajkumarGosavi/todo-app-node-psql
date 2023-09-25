const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const port = 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})