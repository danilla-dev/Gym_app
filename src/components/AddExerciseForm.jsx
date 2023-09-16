// React
import React, { useState, useContext, useEffect } from 'react'

// Lib
import { useHistory } from 'react-router-dom'
import { get, child } from 'firebase/database'

// Components

// Layouts

//Contexts
import { StartTrainingContext } from '../contexts/StartTrainingContext'
import { UserContext } from '../contexts/UserContext'

// Styles
import '../styles/AddExerciseForm.scss'
// DB
import { saveTrainingSession } from '../firebase/handleDatabase'
import { dbRef } from '../firebase/firebaseConfig'

const groups = ['Chest', 'Back', 'Shoulders', 'Abs', 'Biceps', 'Legs', 'Triceps']

const AddExerciseForm = () => {
	const { selectedExercises, setSelectedExercises, disableButton, setDisableButton, trainingData, setTrainingData } =
		useContext(StartTrainingContext)
	const { userID } = useContext(UserContext)
	const [selectOption, setSelectOption] = useState({
		group: '',
		exercise: '',
	})
	const [hideFrom, setHideForm] = useState(false)
	const [userExercises, setUserExercises] = useState()

	useEffect(() => {
		get(child(dbRef, `exercises/${userID}`))
			.then(snapshot => {
				if (snapshot.exists()) {
					console.log([snapshot.val()])
					setUserExercises([snapshot.val()])
				} else {
					console.log('No data available')
				}
			})
			.catch(error => {
				console.error(error)
			})
	}, [])

	const formHideStyle = hideFrom ? { height: 0, overflow: 'hidden' } : { height: 'unset', overflow: 'hidden' }

	const history = useHistory()
	const path = history.location.pathname
	const parts = path.split('/')
	const trainingName = parts[parts.length - 1]

	const handleSelectChange = e => {
		const { value, name } = e.target
		setSelectOption(prevData => ({
			...prevData,
			[name]: value,
		}))
	}
	const handleStartExercise = e => {
		e.preventDefault()
		const { group, exercise } = selectOption
		if (group === '' || group === 'Select group' || exercise === '' || exercise === 'Select exercise') {
			return
		} else {
			setHideForm(prevState => !prevState)
			const newSelectedExercises = selectedExercises.concat(selectOption.exercise)
			setSelectedExercises(newSelectedExercises)
			setDisableButton(true)
			const exerciseIndex = trainingData.exercises.length
			trainingData.exercises.push({
				name: exercise,
				index: exerciseIndex + 1,
				series: [],
			})
		}
	}
	const handleHideForm = () => {
		setHideForm(prevState => !prevState)
	}

	const selectedGroup = (userExercises && userExercises[0][selectOption.group]) || []
	return (
		<div className='add-exercise-form-container'>
			{hideFrom ? <p onClick={hideFrom ? handleHideForm : null}>Select exercise</p> : null}
			<form style={formHideStyle} className='add-exercise-form'>
				<label htmlFor='groups'>Select muscle group</label>
				<select name='group' id='groups' onChange={handleSelectChange}>
					<option>Select group</option>
					{groups.map((group, index) => {
						return (
							<option key={index} value={group}>
								{group}
							</option>
						)
					})}
				</select>
				<label htmlFor='exercises'>Select exercise</label>
				<select name='exercise' id='exercises' onChange={handleSelectChange}>
					<option>Select exercise</option>
					{selectedGroup.map((exercise, index) => {
						return (
							<option key={index} value={exercise}>
								{exercise}
							</option>
						)
					})}
				</select>
				<button className='add-training-button' onClick={handleStartExercise} disabled={disableButton}>
					Start exercise
				</button>
				<button
					onClick={e => {
						e.preventDefault()
						console.log(trainingData)
						saveTrainingSession(userID, trainingData, trainingName)
						setSelectedExercises([])
						setTrainingData({
							date: trainingData.date,
							exercises: [],
						})
						history.push('/')
					}}
				>
					Save exercise
				</button>
				{disableButton && <span>You must finish your last exercise session.</span>}
			</form>
		</div>
	)
}

export default AddExerciseForm
