import React from 'react'
import './Modal.scss'

const Backdrop = ({ children, isOpen, toggle }) => {
	const classes = isOpen ? 'Backdrop Show' : 'Backdrop'
	return (
		<div className={classes} onClick={toggle}>
			{children}
		</div>
	)
}

export default Backdrop
