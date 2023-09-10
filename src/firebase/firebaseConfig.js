import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyC6Bps5__TJh1Dx1yHsOtMTg-6dPWlpWr4',
	authDomain: 'gym-app-f6ad7.firebaseapp.com',
	databaseURL: 'https://gym-app-f6ad7-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'gym-app-f6ad7',
	storageBucket: 'gym-app-f6ad7.appspot.com',
	messagingSenderId: '499023533219',
	appId: '1:499023533219:web:b0d98e71f772136b2e1b16',
	measurementId: 'G-RHS0CGJXW4',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const analytics = getAnalytics(app)
setPersistence(auth, browserSessionPersistence)
	.then(() => {
		console.log('Zachowanie sesji ustawione na pamięć przeglądarki.')
	})
	.catch(error => {
		console.error('Błąd ustawiania zachowania sesji:', error)
	})
