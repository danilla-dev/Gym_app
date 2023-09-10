import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../firebase/firebaseConfig'
// Lib
import { useHistory } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
// Components
// Layouts
// Contexts
// Styles
import '../styles/AuthPage.scss'
export const UserContext = createContext()
const UserProvider = ({ children }) => {
	const history = useHistory()
	const [userID, setUserID] = useState()
	const [userNick, setUserNick] = useState()
	const [isLoading, setIsLoading] = useState(true)

	const logoutUser = () => {
		signOut(auth).then(() => setUserID(null))
	}
	useEffect(() => {
		onAuthStateChanged(auth, firebaseUser => {
			if (firebaseUser) {
				console.log(firebaseUser)
				setUserID(firebaseUser.uid)
				setIsLoading(false)
				history.push('/')
			} else {
				setIsLoading(false)
				history.push('/auth/login')
			}
		})
	}, [])
	const userContextValue = {
		userID,
		userNick,
		setUserNick,
		setUserID,
		isLoading,
		logoutUser,
	}
	return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>
}
export default UserProvider
