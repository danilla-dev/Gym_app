// React
import React from 'react'

// Lib

// Components

// Layouts

//Contexts

// Styles
import '../styles/ExercisesMaxes.scss'

const maxesDB = [
	{ name: 'Bench press', result: '150kg', reps: 1 },
	{ name: 'Squats', result: '225kg', reps: 1 },
	{ name: 'Deadlift', result: '250kg', reps: 1 },
]

const ExercisesMaxes = () => {
	const maxes = maxesDB.map((max, index) => {
		const { name, result, reps } = max
		return (
			<div key={index} className='home-page-max'>
				<p className='home-page-max__name'>{name}</p>
				<p className='home-page-max__result'>{result}</p>
				<p className='home-page-max__rep'>{reps}</p>
			</div>
		)
	})
	return (
		<>
			<div className='home-page-maxes-info'>
				<p>Name</p>
				<p>Result</p>
				<p>Reps</p>
			</div>
			{maxes}
			<button className='home-page-maxes__add-max-btn'>Add max</button>
		</>
	)
}

export default ExercisesMaxes
