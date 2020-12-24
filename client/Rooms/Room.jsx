import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'

let socket

const Room = () => {
	const { roomId } = useParams()

	const [videoUrl, setVideoUrl] = useState('')
	const [videoId, setVideoId] = useState('')

	const [error, setError] = useState('')

	const ENDPOINT = 'localhost:3000'

	useEffect(() => {
		socket = io(ENDPOINT)

		socket.emit('join', { roomId })

		return () => {
			socket.disconnect()
		}
	}, [roomId])

	useEffect(() => {
		socket.on('newVideo', (newVideoId) => {
			setVideoId(newVideoId)
		})
	}, [videoId])

	const addVideoHandler = () => {
		if (videoUrl !== '') {
			socket.emit('addVideo', { roomId, videoUrl })
		} else {
			setError('is-invalid')
		}
	}

	return (
		<div className="container">
			<div className="row">
				<h1>{roomId}</h1>
			</div>
			<div className="row mb-3">
				<label className="form-label" htmlFor="videoUrl">
					Enter youtube video URL
				</label>
				<input
					className={'form-control ' + error}
					type="text"
					name="videoUrl"
					id="videoUrl"
					aria-describedby="urlInvalid"
					value={videoUrl}
					onChange={(e) => setVideoUrl(e.target.value)}
				/>
				<div id="urlInvalid" className="invalid-feedback">
					Please enter an URL
				</div>
				<button
					className="btn btn-dark btn-lg"
					onClick={addVideoHandler}
				>
					Add
				</button>
			</div>
			<div className="row">
				<h1>{videoId}</h1>
			</div>
		</div>
	)
}

export default Room
