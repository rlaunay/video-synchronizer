const path = require('path')
const http = require('http')

const express = require('express')
const bodyParser = require('body-parser')
const socketio = require('socket.io')

const {
	getVideoIdFromURl,
	joinRoom,
	delRoom,
	addVideo,
} = require('./utils/video')

const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
	console.log('New connection')

	socket.on('join', ({ roomId }) => {
		console.log(roomId)

		joinRoom(roomId)
		socket.join(roomId)
		console.log(socket.rooms)
		console.log(socket.rooms.size)
	})

	socket.on('addVideo', ({ roomId, videoUrl }) => {
		console.log('room:', roomId, 'video:', videoUrl)
		const newVideoId = getVideoIdFromURl(videoUrl)

		socket.to(roomId).emit('newVideo', newVideoId)
		socket.emit('newVideo', newVideoId)
	})

	socket.on('disconnect', () => {
		console.log(socket.rooms.size)
		console.log('User left')
	})
})

app.use(bodyParser.json())
app.use(express.static(path.join('public')))

app.use((_req, res, _next) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

server.listen(PORT, () => {
	console.log(`Server has started on port: ${PORT}`)
})
