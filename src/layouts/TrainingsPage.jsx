// React
import React, { useState, useContext } from 'react'

// Lib
import { Link, useHistory } from 'react-router-dom'

// Components

// Layouts

//Contexts
import { UserContext } from '../contexts/UserContext'

// Styles
import '../styles/TrainingsPage.scss'
// DB
import { getTrainingData } from '../firebase/handleDatabase'

const trainingDB = [
	{
		day: 'Monday',
		sessions: [
			{
				date: '04.09.2023',
				name: 'Push-1',
				exercises: [
					{
						name: 'Bench press',
						series: [
							{ weight: 90, reps: 8 },
							{ weight: 90, reps: 8 },
							{ weight: 95, reps: 6 },
							{ weight: 100, reps: 3 },
						],
					},
					{
						name: 'Incline bench press',
						series: [
							{ weight: 50, reps: 8 },
							{ weight: 50, reps: 8 },
							{ weight: 55, reps: 6 },
							{ weight: 60, reps: 5 },
						],
					},
					{
						name: 'Barbell overhead press',
						series: [
							{ weight: 30, reps: 8 },
							{ weight: 30, reps: 8 },
							{ weight: 35, reps: 6 },
						],
					},
					{
						name: 'Military press',
						series: [
							{ weight: 40, reps: 10 },
							{ weight: 40, reps: 10 },
							{ weight: 55, reps: 6 },
						],
					},
					{
						name: 'Rope push down',
						series: [
							{ weight: 30, reps: 10 },
							{ weight: 30, reps: 10 },
							{ weight: 45, reps: 6 },
						],
					},
				],
			},
		],
	},
]
const Exercise = ({ exercise }) => {
	return (
		<div className='exercise'>
			<p>{exercise.name}</p>
			{exercise.series.map((series, seriesIndex) => (
				<div key={seriesIndex} className='series'>
					<p>{series.weight} kg</p>
					<p>Reps: {series.reps}</p>
				</div>
			))}
		</div>
	)
}

const Session = ({ session, index, showSessionIndex, setShowSessionIndex }) => {
	const isSessionActive = showSessionIndex === index

	return (
		<div
			className={`session-${index + 1} trainings-page__session ${isSessionActive ? 'active' : ''}`}
			onClick={() => {
				setShowSessionIndex(isSessionActive ? null : index)
			}}
		>
			<p className='date'>{session.date}</p>
			<div className='exercise-container' style={{ height: isSessionActive ? '550px' : 0, overflow: 'hidden' }}>
				{session.exercises.map((exercise, exerciseIndex) => (
					<Exercise key={exerciseIndex} exercise={exercise} />
				))}
			</div>
		</div>
	)
}

const Sessions = () => {
	const [showSessionIndex, setShowSessionIndex] = useState(null)
	const { userID } = useContext(UserContext)
	console.log(userID)
	const sessionss = getTrainingData(userID)
	console.log('user sessions')
	console.log(sessionss)
	const sessions = trainingDB[0].sessions.map((session, index) => (
		<Session
			key={index}
			session={session}
			index={index}
			showSessionIndex={showSessionIndex}
			setShowSessionIndex={setShowSessionIndex}
		/>
	))

	return <>{sessions}</>
}
const StartTrainingButton = ({ name }) => {
	return (
		<Link to={`/user/start-training/${name}`}>
			<button className='add-training-button'>Start training</button>
		</Link>
	)
}
const TrainingsPage = () => {
	const history = useHistory()
	const path = history.location.pathname
	const parts = path.split('/')
	const trainingName = parts[parts.length - 1]
	return (
		<div className='trainings-page'>
			<h2 className='trainings-page__training-name'>{trainingName}</h2>
			<StartTrainingButton name={trainingName} />
			<Sessions />
		</div>
	)
}

export default TrainingsPage
