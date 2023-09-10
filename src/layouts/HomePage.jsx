// React
import React from 'react'

// Lib

// Components
import HomePageTraining from '../components/HomePageTraining'
import ExercisesMaxes from '../components/ExercisesMaxes'

// Layouts

//Contexts

// Styles
import '../styles/HomePage.scss'
const HomePage = () => {
	return (
		<div className='home-page'>
			<h2>Your stats</h2>
			<div className='home-page__trainings'>
				<p className='home-page__trainings-title title'>Your trainings list:</p>
				<HomePageTraining />
			</div>
			<div className='home-page__max'>
				<p className='home-page__max-title title'>Your maxes in exercises: </p>
				<ExercisesMaxes />
			</div>
		</div>
	)
}

export default HomePage
