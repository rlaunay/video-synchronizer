import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Home.scss'

import Modal from './../Modal/Modal'
import Backdrop from './../Modal/Backdrop'

import { v4 as uuidv4 } from 'uuid'

const Home = () => {
	const history = useHistory()
	const [inputVal, setInputVal] = useState('')
	const [error, setError] = useState(false)
	const [modal, setModal] = useState(false)

	const createRoomHandler = () => {
		const id = uuidv4()
		history.push(`/${id}`)
	}

	const joinRoomHandler = () => {
		if (inputVal.startsWith('http')) {
			setError(false)
			const end = inputVal.split('/')
			const id = end[end.length - 1]
			history.push(`/${id}`)
		} else if (
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
				inputVal
			)
		) {
			setError(false)
			history.push(`/${inputVal}`)
		} else {
			setError(true)
		}
	}

	const modalToggleHandler = () => {
		setError(false)
		setInputVal('')
		console.log(inputVal)
		setModal((prev) => !prev)
	}

	return (
		<div className="Home pt-5">
			<Backdrop isOpen={modal} toggle={modalToggleHandler} />
			<Modal
				change={(e) => setInputVal(e.target.value)}
				value={inputVal}
				joinRoomHandler={joinRoomHandler}
				close={modalToggleHandler}
				isOpen={modal}
				isError={error}
			/>

			<h1 className="text-black-50">Video Synchronizer</h1>

			<button onClick={createRoomHandler} className="btn btn-dark Button">
				Create room
			</button>

			<button
				type="button"
				className="btn btn-dark Button"
				onClick={modalToggleHandler}
			>
				Join room
			</button>
		</div>
	)
}

export default Home
