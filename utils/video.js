let rooms = []

const getVideoIdFromURl = (url) => {
	const urlSplit = url.split('/')
	const endUrl = urlSplit.pop()

	if (endUrl.startsWith('watch?v=')) {
		const queryParam = new URLSearchParams(endUrl)
		return queryParam.get('watch?v')
	} else {
		return endUrl
	}
}

const getNbPeople = (roomId) => {
	const existingRoom = rooms.find((room) => room.id === roomId)

	if (existingRoom) {
		return rooms.find((room) => room.id === roomId).count
	} else {
		return 0
	}
}

const joinRoom = (roomId) => {
	const existingRoom = rooms.find((room) => room.id === roomId)

	if (existingRoom) {
		const updatedRoom = { ...existingRoom, count: existingRoom.count + 1  }
		console.log('Joins existing room', updatedRoom)
		rooms = rooms.map(room => {
			if (room.id === roomId) {
				return updatedRoom
			} else {
				return room
			}
		})
		console.log('Joins existing room', rooms)
		return existingRoom.video
	} else {
		rooms.push({ id: roomId, video: '', count: 1 })
		console.log('Create new room', rooms)
		return null
	}
}


const leftRoom = (roomId) => {
	const existingRoom = rooms.find((room) => room.id === roomId)

	if (!existingRoom) return

	if (existingRoom.count <= 1) {
		rooms = rooms.filter(room => room.id !== roomId)
		console.log('Left room AND DESTROY IT', rooms)
	} else {
		const updatedRoom = { ...existingRoom, count: existingRoom.count - 1  }
		rooms = rooms.map(room => {
			if(room.id === roomId) {
				return updatedRoom
			} else {
				return room
			}
		})
		console.log('Left room and count--', rooms)
	}
}

const addVideo = ( roomId, videoId ) => {
	const existingRoom = rooms.find((room) => room.id === roomId)
	console.log('ADD VIDEO CA MERE', videoId)

	const updatedRoom = { ...existingRoom, video: videoId  }
	rooms = rooms.map(room => {
		if(room.id === roomId) {
			return updatedRoom
		} else {
			return room
		}
	})
	console.log('Add video', rooms)
}

module.exports = { getVideoIdFromURl, joinRoom, leftRoom, addVideo, getNbPeople }
