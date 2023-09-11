// React
import { useContext, useEffect, useState } from 'react'
// Lib
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import Navigation from './components/Navigation'
import TrainingsPage from './layouts/TrainingsPage'
import StartTrainingPage from './layouts/StartTrainingPage'
// Layouts
import AuthPage from './layouts/AuthPage'
import HomePage from './layouts/HomePage'
//Contexts
import { UserContext } from './contexts/UserContext'
import StartTrainingProvider from './contexts/StartTrainingContext'
// Styles
import '../src/styles/App.scss'

const App = () => {
	const { isLoading } = useContext(UserContext)
	return (
		<div className='App App-container'>
			{isLoading ? null : (
				<>
					<Navigation />
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
						<Route path='/user/start-training/*'>
							<StartTrainingProvider>
								<StartTrainingPage />
							</StartTrainingProvider>
						</Route>
					</Switch>
				</>
			)}
		</div>
	)
}

export default App
