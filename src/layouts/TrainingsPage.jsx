// React
import React, { useState } from 'react'

// Lib
import { useHistory } from 'react-router-dom'

// Components

// Layouts

//Contexts

// Styles
import '../styles/TrainingsPage.scss'

const trainingDB = [
	{
		day: 'Monday',
		date: '04.09.2023',
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
			{
				date: '28.08.2023',
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
const Sessions = () => {
	const [showSessionIndex, setShowSessionIndex] = useState(null)
	const sessions = trainingDB[0].sessions.map((session, index) => {
		const exercises = session.exercises.map((exercise, index) => {
			return (
				<div key={index} className={`exercise`}>
					<p>{exercise.name}</p>
					{exercise.series.map((series, seriesIndex) => {
						return (
							<div key={seriesIndex} className='series'>
								<p>{series.weight} kg</p>
								<p>Reps: {series.reps}</p>
							</div>
						)
					})}
				</div>
			)
		})
		return (
			<div
				key={index}
				className={`session-${index + 1} trainings-page__session ${showSessionIndex === index ? 'active' : ''}`}
				onClick={() => {
					setShowSessionIndex(showSessionIndex === index ? null : index)
				}}
			>
				<p className={`date`}>{session.date}</p>
				<div
					className='exercise-container'
					style={{ height: showSessionIndex === index ? '550px' : 0, overflow: 'hidden' }}
				>
					{exercises}
				</div>
			</div>
		)
	})
	return <>{sessions}</>
}
const TrainingsPage = () => {
	const history = useHistory()
	const path = history.location.pathname
	const parts = path.split('/')
	const trainingName = parts[parts.length - 1]
	return (
		<div className='trainings-page'>
			<h2 className='trainings-page__training-name'>{trainingName}</h2>
			<Sessions />
		</div>
	)
}

export default TrainingsPage
