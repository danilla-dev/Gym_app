// React
import React, { useContext, useState, useEffect } from 'react'

// Lib
import { Link, useHistory } from 'react-router-dom'
import { dbRef } from '../firebase/firebaseConfig'
import { child, get } from 'firebase/database'
// Components

// Layouts

//Contexts
import { UserContext } from '../contexts/UserContext'

// Styles
import '../styles/ExercisesPage.scss'

const Exercises = ({ exercises, groupName }) => {
	const history = useHistory()
	const handleGoToAddExercisePage = e => {
		history.push(`user/exercises/add/${groupName}`)
	}
	return (
		<>
			<div className='muscle-group__exercises'>
				{exercises.map(exercise => {
					return <p className='muscle-group__exercise-title'>{exercise}</p>
				})}
				<button onClick={handleGoToAddExercisePage} className='muscle-group__add-btn'>
					Add exercise
				</button>
			</div>
		</>
	)
}

const MuscleGroup = ({ group, exercises }) => {
	const handleShowExercises = e => {
		const elementSibling = e.target.nextElementSibling
		elementSibling.classList.toggle('muscle-group__exercises--active')
	}

	return (
		<div className='muscle-group'>
			<p onClick={handleShowExercises} className='muscle-group__title'>
				{group}
			</p>
			<Exercises exercises={exercises} groupName={group} />
		</div>
	)
}

const ExercisesPage = () => {
	const { userID } = useContext(UserContext)
	const [userExercises, setUserExercises] = useState()

	useEffect(() => {
		get(child(dbRef, `exercises/${userID}`))
			.then(snapshot => {
				if (snapshot.exists()) {
					const res = snapshot.val()
					const muscleGroupsArray = Object.entries(res).map(([muscleGroup, exercises]) => ({
						muscleGroup,
						exercises,
					}))
					setUserExercises(muscleGroupsArray)
				} else {
					console.log('No data available')
				}
			})
			.catch(error => {
				console.error(error)
			})
	}, [])

	return (
		<div className='exercises-page'>
			<h2 className='exercises-page__title'>Exercises</h2>
			<div className='mmuscle-groups'>
				{userExercises &&
					userExercises.map(group => {
						return <MuscleGroup group={group.muscleGroup} exercises={group.exercises} />
					})}
			</div>
		</div>
	)
}

export default ExercisesPage
