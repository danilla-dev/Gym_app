import React, { useContext } from 'react'

import { UserContext } from '../contexts/UserContext'
import { ref, set, child, get, getDatabase } from 'firebase/database'
import { database, d } from './firebaseConfig'

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

export const createExercisesDataForUser = userId => {
	set(ref(database, `exercises/${userId}`), {
		Chest: ['Bench Press', 'Dumbbell Bench Press', 'Incline bench press', 'Incline Dumbbell Press', 'Dumbbell Flyes'],
		Back: [
			'Deadlift',
			'Pull-Up',
			'Bent Over Barbell Row',
			'Bent Over Dumbbell Row',
			'Bent Over Dumbbell Raise',
			'Wide-Grip Lat Pulldown',
			'Neutral-Grip Lat Pulldown',
			'Straight Arm Pulldown',
		],
		Shoulders: [
			'Barbell overhead press',
			'Military press',
			'Front Barbell Press',
			'Lateral Raises',
			'Front Raises',
			'Lateral Raises on Cable Machine',
			'Smith Machine Shoulder Press',
		],
		Abs: ['Plank', 'Mountain climber'],
		Biceps: ['Barbell Curls', 'Incline Dumbbell Curls'],
		Legs: ['Back Squat', 'Leg Press'],
		Triceps: ['Bench Dips', 'Push Ups'],
	})
}
