import React, { createContext, useState, useEffect } from 'react'
// Lib
// Components
// Layouts
// Contexts
// Styles
export const StartTrainingContext = createContext()
const StartTrainingProvider = ({ children }) => {
	const [selectedExercises, setSelectedExercises] = useState([])
	const [disableButton, setDisableButton] = useState(false)

	const contextValue = {
		selectedExercises,
		setSelectedExercises,
		disableButton,
		setDisableButton,
	}
	return <StartTrainingContext.Provider value={contextValue}>{children}</StartTrainingContext.Provider>
}
export default StartTrainingProvider
