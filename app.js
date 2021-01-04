const path = require('path')
const http = require('http')
const url = require('url')

const express = require('express')
const bodyParser = require('body-parser')
const socketio = require('socket.io')

const {
	getVideoIdFromURl,
	joinRoom,
	leftRoom,
	addVideo,
	getNbPeople
} = require('./utils/video')

const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
	console.log('New connection')

	socket.on('join', ({ roomId }) => {
		console.log(roomId)

		const videoId = joinRoom(roomId)
		socket.join(roomId)
		const nbPeople = getNbPeople(roomId)
		socket.to(roomId).emit('newPeople', nbPeople)
		socket.emit('newPeople', nbPeople)
		if (videoId) {
			socket.emit('newVideo', videoId)
		}
	})

	socket.on('addVideo', ({ roomId, videoUrl }) => {
		console.log('room:', roomId, 'video:', videoUrl)
		const newVideoId = getVideoIdFromURl(videoUrl)
		console.log(newVideoId)
		addVideo(roomId, newVideoId)

		socket.to(roomId).emit('newVideo', newVideoId)
		socket.emit('newVideo', newVideoId)
	})

	socket.on('disconnect', () => {
		const urlSplit = socket.handshake.headers.referer.split('/')
		const roomId = urlSplit.pop()
		leftRoom(roomId)
		const nbPeople = getNbPeople(roomId)
		socket.to(roomId).emit('newPeople', nbPeople)
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
