import React, { useContext, useEffect, useRef, useState } from 'react'
// Lib
import { Link, useHistory } from 'react-router-dom'
import { createUserWithEmailAndPassword, browserSessionPersistence, setPersistence } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { getDatabase, ref, set } from 'firebase/database'
import { database } from '../firebase/firebaseConfig'

// Components
// layouts
// Contexts
import { UserContext } from '../contexts/UserContext'
// Styles
import '../styles/RegisterForm.scss'
// DB
import { createExercisesDataForUser } from '../firebase/handleDatabase'
const RegisterForm = () => {
	const registerForm = useRef()
	const history = useHistory()
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		passwordRepeat: '',
	})
	const { userID } = useContext(UserContext)
	const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/

	const errorMessages = {
		usernameErrMess: 'Min length of username is 5.',
		passwordErrMess: 'Min length of email is 9.',
		passwordsErrMess: 'Passwords is not same.',
		emailErrMess: 'Invalid email.',
	}

	useEffect(() => {
		window.scrollTo(0, 0)
		const submitButton = registerForm.current.querySelector('.register-form__register-btn')

		const errors = registerForm.current.querySelectorAll('.error')

		const formDataArray = [...Object.values(formData)]

		if (errors.length > 0 || formDataArray.some(data => data === '')) {
			submitButton.disabled = true
		} else {
			submitButton.disabled = false
		}
	}, [formData])

	const setUsername = (id, username) => {
		set(ref(database, 'usernames/' + id), {
			nick: username,
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		const { email, password, username } = formData
		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const { uid } = userCredential.user
				setUsername(uid, username)
				history.push('/')
				createExercisesDataForUser(uid)
			})
			.catch(error => {})
	}

	const handleOnChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	const { email, password, passwordRepeat, username } = formData

	const { usernameErrMess, passwordErrMess, passwordsErrMess, emailErrMess } = errorMessages

	return (
		<div className='register-form-container'>
			<h2>Register</h2>
			<form ref={registerForm} onSubmit={handleSubmit} className='register-form'>
				<label htmlFor='username'>Username:</label>
				<input type='text' onChange={handleOnChange} value={formData.username} name='username' />
				{/* username error */}
				{(username.length < 6) & (username.length > 0) ? <p className='error'>{usernameErrMess}</p> : null}
				<label htmlFor='email'>Email:</label>
				<input type='text' onChange={handleOnChange} value={formData.email} name='email' />
				{/* email error */}
				{!emailRegExp.test(email) & (email !== '') ? <p className='error'>{emailErrMess}</p> : null}
				<label htmlFor='password'>Password:</label>
				<input type='password' onChange={handleOnChange} value={formData.password} name='password' />
				{/* password error */}
				{(password.length < 8) & (password.length > 0) ? <p className='error'>{passwordErrMess}</p> : null}
				<label htmlFor='repeat-password'>Repeat password:</label>
				<input type='password' onChange={handleOnChange} value={formData.passwordRepeat} name='passwordRepeat' />
				{/* repeat password error */}
				{passwordRepeat !== password ? <p className='error'>{passwordsErrMess}</p> : null}
				<div className='buttons'>
					<button disabled={true} className='register-form__register-btn'>
						Register
					</button>
					<p className='register-form__login-text'>Have already account?</p>
					<Link to='/auth/login'>
						<button className='register-form__login-btn'>Login</button>
					</Link>
				</div>
			</form>
		</div>
	)
}

export default RegisterForm
