const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.use(express.static(path.join('public')))

app.use((req, res, next) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(3000)
