import React from 'react'
// Lib
import { Route, Switch } from 'react-router-dom'
// Components
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
// Layouts
// Contexts
// Styles
import '../styles/AuthPage.scss'
const AuthPage = () => {
	return (
		<div className='auth-page'>
			<Switch>
				<Route path='/auth/login'>
					<LoginForm />
				</Route>
				<Route path='/auth/register'>
					<RegisterForm />
				</Route>
			</Switch>
		</div>
	)
}

export default AuthPage
