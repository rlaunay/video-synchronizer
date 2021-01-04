import React from 'react'

const Modal = ({ change, value, joinRoomHandler, close, isOpen, isError }) => {
	const classes = isOpen ? 'Modal Show' : 'Modal'
	const error = isError ? 'is-invalid' : ''
	return (
		<div className={'modal show ' + classes} style={{ display: 'block' }}>
			<div className="modal-dialog mt-5">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="joinModalLabel">
							Join Room
						</h5>
						<button
							type="button"
							className="btn-close"
							aria-label="Close"
							onClick={close}
						></button>
					</div>
					<div className="modal-body">
						<div className="form-group">
							<label className="form-label" htmlFor="idRoom">
								Please enter the ID or URL of the room you want
								to join :
							</label>
							<input
								className={'form-control ' + error}
								type="text"
								name="idRoom"
								id="idRoom"
								aria-describedby="idRoomFeedback"
								value={value}
								onChange={change}
							/>
							<div
								id="idRoomFeedback"
								className="invalid-feedback"
							>
								Please enter valid ID or URL
							</div>
						</div>
					</div>
					<div className="modal-footer container">
						<div className="row justify-content-evenly">
							<div className="col">
								<button
									type="button"
									className="btn btn-secondary btn-lg"
									onClick={close}
								>
									Close
								</button>
							</div>
							<div className="col">
								<button
									type="button"
									className="btn btn-dark btn-lg px-4"
									onClick={joinRoomHandler}
								>
									JOIN
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
