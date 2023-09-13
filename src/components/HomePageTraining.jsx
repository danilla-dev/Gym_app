// React
import React from 'react'

// Lib
import { Link } from 'react-router-dom'
// Components

// Layouts

//Contexts

// Styles
import '../styles/HomePageTraining.scss'
// prototype of db with trainings
const trainingsDB = [
	{ name: 'Push-1', day: 'Monday', lastTraining: '04.09.2023' },
	{ name: 'Pull-1', day: 'Tuesday', lastTraining: '05.09.2023' },
	{ name: 'Push-2', day: 'Thursday', lastTraining: '07.09.2023' },
	{ name: 'Pull-2', day: 'Friday', lastTraining: '08.09.2023' },
	{ name: 'Legs', day: 'Saturday', lastTraining: '09.09.2023' },
]

const HomePageTraining = () => {
	const trainings = trainingsDB.map((training, index) => {
		const { name, day, lastTraining } = training
		return (
			<Link key={index} to={`/user/trainings/${name}`}>
				<div key={index} className='home-page-training'>
					<p className='home-page-training__name'>{name}</p>
					<p className='home-page-training__day'>{day}</p>
					<p className='home-page-training__last-training'>{lastTraining}</p>
				</div>
			</Link>
		)
	})
	return (
		<>
			<div className='home-page-trainings-info'>
				<p>Name</p>
				<p>Day</p>
				<p>Last training</p>
			</div>
			{trainings}
			<button className='home-page-trainings__add-training-btn'>Add training</button>
		</>
	)
}

export default HomePageTraining
