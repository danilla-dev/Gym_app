import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router, Route, useHistory, Switch } from 'react-router-dom'

import UserProvider from './contexts/UserContext'

import '../src/styles/index.scss'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Router>
			<UserProvider>
				<App />
			</UserProvider>
		</Router>
	</React.StrictMode>
)
