// React
import React from 'react'

// Lib

// Components
import AddExerciseForm from '../components/AddExerciseForm'
import ExerciseWindow from '../components/ExerciseWindow'
// Layouts

//Contexts

// Styles
import '../styles/StartTrainingPage.scss'
const AddTrainingPage = () => {
	return (
		<div className='start-training-page'>
			<ExerciseWindow />
			<AddExerciseForm />
		</div>
	)
}

export default AddTrainingPage
