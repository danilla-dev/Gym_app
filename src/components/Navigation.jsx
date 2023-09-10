import React, { useState } from 'react'
// Lib
import { FaBars } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { GiStrong } from 'react-icons/gi'
// Components
import AsideMenu from './AsideMenu'
// layouts
// Contexts
// Styles
import '../styles/Navigation.scss'
const Navigation = () => {
	const [showMenu, setShowMenu] = useState(false)
	const handleShowMenu = () => {
		setShowMenu(prevData => !prevData)
	}
	return (
		<nav className='nav'>
			<h1 className='nav__title'>
				GymApp <GiStrong />
			</h1>
			<button onClick={handleShowMenu} className='nav__button'>
				{showMenu ? <FaXmark /> : <FaBars />}
			</button>
			<AsideMenu style={showMenu ? { left: 0 } : { left: '-100%' }} />
		</nav>
	)
}

export default Navigation
