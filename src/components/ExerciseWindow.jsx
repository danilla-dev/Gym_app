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
	return series.map((el, index) => {
		if (el.exerciseIndex === exerciseIndex) {
			const { weight, reps } = el
			return <ExerciseSeries key={index} weight={weight} reps={reps} index={index} />
		}
		return null
	})
}

const ExerciseWindow = () => {
	const { selectedExercises } = useContext(StartTrainingContext)
	const [series, setSeries] = useState([])
	console.log(series)
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

	const handleAddSeries = (event, index) => {
		event.preventDefault()
		const { weight, reps } = formData
		const newSeries = series.concat({ exerciseIndex: index, weight: weight, reps: reps })
		setSeries(newSeries)
	}
	const handleToggleWindow = index => {
		setOpenWindows(prevState => {
			const newOpenWindows = [...prevState]
			newOpenWindows[index] = !prevState[index]
			return newOpenWindows
		})
	}

	const windowHideStyles = { overflow: 'hidden', height: hideWindow ? '0' : 'unset' }

	const exercisesWindows = selectedExercises.map((exercise, index) => {
		console.log(index)
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
						<AllSeries exerciseIndex={index} series={series} />
					</div>
					<div className='exercise-window__form'>
						<form onSubmit={e => handleAddSeries(e, index)}>
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
