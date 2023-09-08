// React
import { BrowserRouter as Router, Route, useHistory, Switch } from 'react-router-dom'
// Lib
// Components
import Navigation from './components/Navigation'
// Layouts
import AuthPage from './layouts/AuthPage'
import HomePage from './layouts/HomePage'
//Contexts
// Styles
import '../src/styles/App.scss'

function App() {
	return (
		<Router>
			<div className='App App-container'>
				<Navigation />
				<Switch>
					<Route exact path='/'>
						<HomePage />
					</Route>
					<Route path='/auth'>
						<AuthPage />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App
