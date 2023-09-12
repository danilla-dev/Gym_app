// React
import React, { useState, useContext, useEffect } from 'react'

// Lib

// Components

// Layouts

//Contexts
import { StartTrainingContext } from '../contexts/StartTrainingContext'

// Styles
import '../styles/AddExerciseForm.scss'

const groups = ['Chest', 'Back', 'Shoulders', 'Abs', 'Biceps', 'Legs', 'Triceps']
const exercises = [
	{
		Chest: ['Bench Press', 'Incline bench press'],
		Back: ['Deadlift', 'Pull-Up'],
		Shoulders: ['Barbell overhead press', 'Military press'],
		Abs: ['Plank', 'Mountain climber'],
		Biceps: ['Barbell Curls', 'Incline Dumbbell Curls'],
		Legs: ['Back Squat', 'Leg Press'],
		Triceps: ['Bench Dips', 'Push Ups'],
	},
]

const AddExerciseForm = () => {
	const { selectedExercises, setSelectedExercises, disableButton, setDisableButton } = useContext(StartTrainingContext)

	const [selectOption, setSelectOption] = useState({
		group: '',
		exercise: '',
	})
	const [hideFrom, setHideForm] = useState(false)

	const formHideStyle = hideFrom ? { height: 0, overflow: 'hidden' } : { height: 'unset', overflow: 'hidden' }

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
		}
	}
	const handleHideForm = () => {
		setHideForm(prevState => !prevState)
	}
	const selectedGroup = exercises[0][selectOption.group] || []
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
				{disableButton && <span>You must finish your last exercise session.</span>}
			</form>
		</div>
	)
}

export default AddExerciseForm
