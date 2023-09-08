import React from 'react'
// Lib
import { FaBars } from 'react-icons/fa'
import { GiStrong } from 'react-icons/gi'
// Components
// layouts
// Contexts
// Styles
import '../styles/Navigation.scss'
const Navigation = () => {
	return (
		<>
			<nav className='nav'>
				<h1 className='nav__title'>
					GymApp <GiStrong />
				</h1>
				<button className='nav__button'>
					<FaBars />
				</button>
			</nav>
		</>
	)
}

export default Navigation
