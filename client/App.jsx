import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home/Home'
import Room from './Rooms/Room'
import Error404 from './Error404/Error404'

import './App.scss'

const App = () => {
	return (
		<div className="container App">
			<Switch>
				<Route
					exact
					path="/:roomId([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})"
				>
					<Room />
				</Route>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="*">
					<Error404 />
				</Route>
			</Switch>
		</div>
	)
}

export default App
