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
		<div className='exercise-window__series-1 series'>
			<p className='series-count'>{index + 1}</p>
			<p className='weight'>{weight}kg</p>
			<p className='reps'>{reps}</p>
		</div>
	)
}
const ExerciseWindow = () => {
	const { selectedExercises } = useContext(StartTrainingContext)
	const [series, setSeries] = useState([])
	const [formData, setFormData] = useState({
		weight: 0,
		reps: 0,
	})
	const [hideWindow, setHideWindow] = useState(false)

	const [openWindows, setOpenWindows] = useState(Array(selectedExercises.length).fill(false))

	const handleOnChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleAddSeries = e => {
		e.preventDefault()
		const { weight, reps } = formData
		const newSeries = series.concat({ weight: weight, reps: reps })
		setSeries(newSeries)
	}
	const handleToggleWindow = index => {
		setOpenWindows(prevState => {
			const newOpenWindows = [...prevState]
			newOpenWindows[index] = !prevState[index]
			return newOpenWindows
		})
	}

	const allSeries = series.map((el, index) => {
		const { weight, reps } = el
		return <ExerciseSeries weight={weight} reps={reps} index={index} />
	})

	const windowHideStyles = { overflow: 'hidden', height: hideWindow ? '0' : 'unset' }

	const exercisesWindows = selectedExercises.map((exercise, index) => {
		return (
			<div className='exercise-window'>
				<p onClick={() => handleToggleWindow(index)} className='exercise-window__name'>
					{exercise}
				</p>
				<div style={windowHideStyles} className='exercise-data'>
					<div className='exercise-window__series'>
						<div className='exercise-window__series-info'>
							<p className='series-count'>Count</p>
							<p className='weight'> Weight </p>
							<p className='reps'>Reps</p>
						</div>
						{allSeries}
					</div>
					<div className='exercise-window__form'>
						<form onSubmit={handleAddSeries}>
							<label htmlFor='weight'>Weight: </label>
							<input type='text' name='weight' id='weight' onChange={handleOnChange} />
							<label htmlFor='reps'>Reps: </label>
							<input type='text' name='reps' id='reps' onChange={handleOnChange} />
							<button>Add</button>
						</form>
						<button onClick={() => handleToggleWindow(index)}>Save</button>
					</div>
				</div>
			</div>
		)
	})

	return <>{exercisesWindows}</>
}

export default ExerciseWindow
