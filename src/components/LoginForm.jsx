import React, { useState } from 'react'
// Lib
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { useHistory } from 'react-router-dom'
// Components
// layouts
// Contexts
// Styles
import '../styles/LoginForm.scss'
const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const history = useHistory()

	const handleSubmit = e => {
		e.preventDefault()
		const { email, password } = formData
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const user = userCredential.user
				history.push('/')
			})
			.catch(error => {
				const errorCode = error.code
				console.log(errorCode)
			})
	}
	const handleOnChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}
	return (
		<div className='login-form-container'>
			<h2>Login</h2>
			<form onSubmit={handleSubmit} className='login-form'>
				<p className='error'></p>
				<label htmlFor='email'>Email:</label>
				<input type='text' onChange={handleOnChange} value={formData.email} name='email' />
				<label htmlFor='password'>Password:</label>
				<input type='password' onChange={handleOnChange} value={formData.password} name='password' />
				<div className='buttons'>
					<button className='login-form__login-btn'>Login</button>
					<p className='login-form__register-text'>Don't have account yet?</p>
					<Link to='/auth/register'>
						<button className='login-form__register-btn'>Register</button>
					</Link>
				</div>
			</form>
		</div>
	)
}

export default LoginForm
