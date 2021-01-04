import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'

import PeopleIcon  from './../icons/PeopleFill'
import './Room.scss'

let socket

const Room = () => {
	const { roomId } = useParams()

	const [videoUrl, setVideoUrl] = useState('')
	const [videoId, setVideoId] = useState('')
	const [nbPeople, setNbPeople] = useState(0)

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
		socket.on('newPeople', (nbPeople) => {
			setNbPeople(nbPeople)
		})
	}, [nbPeople])

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
				<h1 className="text-center mt-5">Video Synchronizer</h1>
				<div className="d-flex justify-content-center align-items-center mt-3">
					<PeopleIcon />
					<span className="NumbersOfPeople">{nbPeople}</span>
				</div>
			</div>
			<label className="form-label mt-5" htmlFor="videoUrl">
					Enter youtube video URL
			</label>
			<div className="input-group mb-3 url-form">
				<input
					className={'form-control ' + error}
					type="text"
					name="videoUrl"
					id="videoUrl"
					aria-describedby="urlInvalid"
					value={videoUrl}
					onChange={(e) => setVideoUrl(e.target.value)}
				/>
				<div id="urlInvalid" className="invalid-feedback ErrorLabel">
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
