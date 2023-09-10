// React
import { useContext, useEffect, useState } from 'react'
// Lib
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import Navigation from './components/Navigation'
import TrainingsPage from './layouts/TrainingsPage'
// Layouts
import AuthPage from './layouts/AuthPage'
import HomePage from './layouts/HomePage'
//Contexts
import { UserContext } from './contexts/UserContext'
// Styles
import '../src/styles/App.scss'

const App = () => {
	const { userID, isLoading } = useContext(UserContext)
	return (
		<div className='App App-container'>
			<Navigation />
			{isLoading ? null : (
				<Switch>
					<Route exact path='/'>
						<HomePage />
					</Route>
					<Route path='/auth'>
						<AuthPage />
					</Route>
					<Route path='/user/trainings/*'>
						<TrainingsPage />
					</Route>
				</Switch>
			)}
		</div>
	)
}

export default App
