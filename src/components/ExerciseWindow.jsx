// React
import React, { useState, useContext } from 'react'

// Lib

// Components

// Layouts

//Contexts
import { StartTrainingContext } from '../contexts/StartTrainingContext'

// Styles
import '../styles/ExerciseWindow.scss'
const ExerciseSeries = ({ weight, reps, index }) => {
	return (
		<div key={index} className='exercise-window__series-1 series'>
			<p className='series-count'>{index + 1}</p>
			<p className='weight'>{weight}kg</p>
			<p className='reps'>{reps}</p>
		</div>
	)
}
const AllSeries = ({ exerciseIndex, series }) => {
	const seriesForExerciseArray = []
	return series.map((el, index) => {
		if (el.exerciseIndex === exerciseIndex) {
			seriesForExerciseArray.push(el)
			const count = seriesForExerciseArray.indexOf(el)
			const { weight, reps } = el
			return <ExerciseSeries key={index} weight={weight} reps={reps} index={count} />
		}
		return null
	})
}

const ExerciseWindow = () => {
	const { selectedExercises, disableButton, setDisableButton } = useContext(StartTrainingContext)
	const [series, setSeries] = useState([])
	const [finishSession, setFinishSession] = useState([])

	const [formData, setFormData] = useState({
		weight: 0,
		reps: 0,
	})

	const [openWindows, setOpenWindows] = useState(Array(selectedExercises.length).fill(false))

	const handleOnChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleAddSeries = (event, index) => {
		event.preventDefault()
		const { weight, reps } = formData
		const newSeries = series.concat({ exerciseIndex: index, weight: weight, reps: reps })
		setSeries(newSeries)
	}
	const handleToggleWindow = e => {
		const window = e.target.nextElementSibling || e.target.closest('.exercise-data')
		window.classList.toggle('exercise-data--hide')
	}
	const handleFinishExercise = indexOfSession => {
		setDisableButton(false)
		const finishedSessions = finishSession.concat({ sessionIndex: indexOfSession })
		setFinishSession(finishedSessions)
	}

	const windowHideStyles = { overflow: 'hidden', height: openWindows ? 'unset' : '0' }

	const exercisesWindows = selectedExercises.map((exercise, index) => {
		return (
			<div key={index} className='exercise-window'>
				<p onClick={e => handleToggleWindow(e)} className='exercise-window__name'>
					{exercise}
				</p>
				<div className='exercise-data'>
					<div className='exercise-window__series'>
						<div className='exercise-window__series-info'>
							<p className='series-count'>Count</p>
							<p className='weight'> Weight </p>
							<p className='reps'>Reps</p>
						</div>
						<AllSeries exerciseIndex={index} series={series} />
					</div>
					<div className='exercise-window__form'>
						{!finishSession.some(session => session.sessionIndex === index) && (
							<>
								<form onSubmit={e => handleAddSeries(e, index)}>
									<label htmlFor='weight'>Weight: </label>
									<input type='text' name='weight' id='weight' onChange={handleOnChange} />
									<label htmlFor='reps'>Reps: </label>
									<input type='text' name='reps' id='reps' onChange={handleOnChange} />
									<button>Add</button>
								</form>
								<button
									className='finish-button'
									onClick={e => {
										handleToggleWindow(e)
										handleFinishExercise(index)
									}}
								>
									Finish
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		)
	})

	return <>{exercisesWindows}</>
}

export default ExerciseWindow
