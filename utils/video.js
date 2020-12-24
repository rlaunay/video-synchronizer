let rooms = []

const getVideoIdFromURl = (url) => {
	const urlSplit = url.split('/')
	const endUrl = urlSplit[urlSplit.length - 1]

	if (endUrl.startsWith('watch?v=')) {
		const queryParam = new URLSearchParams(endUrl)
		return queryParam.get('watch?v')
	} else {
		return endUrl
	}
}

const joinRoom = (roomId) => {
	const existingRoom = rooms.find((room) => room.id === roomId)

	if (existingRoom) {
		console.log('Joins existing room', rooms)
		return existingRoom.video
	} else {
		rooms.push({ id: roomId, video: '' })
		console.log('Create new room', rooms)
	}
}

const delRoom = (roomId) => {
	const roomAct = rooms.find((room) => room.id === roomId)

	rooms = rooms.filter((room) => room.id !== roomId)
}

const addVideo = ({ roomId, videoId }) => {
	const existingRoom = rooms.find((room) => room.id === roomId)

	existingRoom.video = videoId
	console.log('Add video', rooms)
}

module.exports = { getVideoIdFromURl, joinRoom, delRoom, addVideo }
