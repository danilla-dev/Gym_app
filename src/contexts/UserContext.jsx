import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../firebase/firebaseConfig'
// Lib
import { useHistory } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { getDatabase, ref, child, get } from 'firebase/database'
import { database } from '../firebase/firebaseConfig'
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
		setUserNick()
		signOut(auth).then(() => setUserID())
	}
	const findUsername = id => {
		const dbRef = ref(getDatabase())
		get(child(dbRef, `usernames/${id}/nick`))
			.then(snapshot => {
				if (snapshot.exists()) {
					setUserNick(snapshot.val())
					setIsLoading(false)
					// history.push('/')
				} else {
					console.log('No data available')
				}
			})
			.catch(error => {
				console.error(error)
			})
	}
	useEffect(() => {
		onAuthStateChanged(auth, firebaseUser => {
			if (firebaseUser) {
				setUserID(firebaseUser.uid)
				findUsername(firebaseUser.uid)
			} else {
				setIsLoading(false)
				history.push('/auth/login')
			}
		})
	}, [userNick])

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
