import React, { useEffect, useState } from 'react'
// Lib
import { Link } from 'react-router-dom'
import { signUpWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
// Components
// layouts
// Contexts
// Styles
import '../styles/RegisterForm.scss'
const RegisterForm = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		passwordRepeat: '',
	})
	const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/
	const errorMessages = {
		usernameErrMess: 'Min length of username is 5.',
		passwordErrMess: 'Min length of email is 9.',
		passwordsErrMess: 'Passwords is not same.',
		emailErrMess: 'Invalid email.',
	}
	useEffect(() => {
		window.scrollTo(0, 0)
	})
	const handleSubmit = e => {
		e.preventDefault()
	}
	const handleOnChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}
	const { email, password, passwordRepeat, username } = formData
	return (
		<div className='register-form-container'>
			<h2>Register</h2>
			<form onSubmit={handleSubmit} className='register-form'>
				<p className='error'></p>
				<label htmlFor='username'>Username:</label>
				<input type='text' onChange={handleOnChange} value={formData.username} name='username' />
				{/* username error */}
				{(username.length < 6) & (username.length > 0) ? (
					<p className='error'>{errorMessages.usernameErrMess}</p>
				) : null}
				<label htmlFor='email'>Email:</label>
				{/* email error */}
				{!emailRegExp.test(email) & (email !== '') ? <p className='error'>{errorMessages.emailErrMess}</p> : null}
				<input type='text' onChange={handleOnChange} value={formData.email} name='email' />
				<label htmlFor='password'>Password:</label>
				<input type='password' onChange={handleOnChange} value={formData.password} name='password' />
				<label htmlFor='repeat-password'>Repeat password:</label>
				<input type='password' onChange={handleOnChange} value={formData.passwordRepeat} name='passwordRepeat' />
				<div className='buttons'>
					<button className='register-form__register-btn'>Register</button>
					<p>Have already account?</p>
					<Link to='/auth/login'>
						<button className='register-form__login-btn'>Login</button>
					</Link>
				</div>
			</form>
		</div>
	)
}

export default RegisterForm
