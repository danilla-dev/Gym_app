import React, { createContext, useState, useEffect } from 'react'
// Lib
import { useHistory } from 'react-router-dom'
// Components
// Layouts
// Contexts
// Styles

export const StartTrainingContext = createContext()
const StartTrainingProvider = ({ children }) => {
	const history = useHistory()
	const path = history.location.pathname
	const parts = path.split('/')
	const trainingName = parts[parts.length - 1]

	const getCurrentDate = () => {
		const currentDate = new Date()
		const day = String(currentDate.getDate()).padStart(2, '0')
		const month = String(currentDate.getMonth() + 1).padStart(2, '0')
		const year = String(currentDate.getFullYear()).slice(-2)
		const formattedDate = `${day}-${month}-${year}`
		return formattedDate
	}

	const currentDate = getCurrentDate()

	const [selectedExercises, setSelectedExercises] = useState([])
	const [disableButton, setDisableButton] = useState(false)
	const [trainingData, setTrainingData] = useState({
		date: currentDate,
		exercises: [],
	})
	const contextValue = {
		selectedExercises,
		setSelectedExercises,
		disableButton,
		setDisableButton,
		trainingData,
		setTrainingData,
	}
	return <StartTrainingContext.Provider value={contextValue}>{children}</StartTrainingContext.Provider>
}
export default StartTrainingProvider
