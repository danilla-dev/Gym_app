import React, { useContext } from 'react'

import { UserContext } from '../contexts/UserContext'
import { ref, set, child, get, getDatabase } from 'firebase/database'
import { database } from './firebaseConfig'

const trainingData = {
	date: '13-09-2023',
	name: 'Push-1',
	exercises: [
		{
			name: 'Bench press',
			index: 0,
			series: [{ weight: 100, reps: 8 }],
		},
		{
			name: 'Inecline bench press',
			index: 0,
			series: [{ weight: 100, reps: 8 }],
		},
	],
}
export const saveTrainingSession = (userId, trainingData, trainingName) => {
	const { date, name, exercises } = trainingData

	set(ref(database, `trainings/${userId}/${trainingName}/${date}`), exercises)
}

// export const getTrainingData = async userId => {
// 	const dbRef = ref(getDatabase())

// 	await get(child(dbRef, `trainings/${userId}`))
// 		.then(snapshot => {
// 			if (snapshot.exists()) {
// 				console.log([snapshot.val()])
// 			} else {
// 				console.log('No data available')
// 			}
// 		})
// 		.catch(error => {
// 			console.error(error)
// 		})
// }
// getTrainingData('iv0bCm5EN7SZA4jQHJS2euorZjB3')