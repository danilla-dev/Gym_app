import React, { useState, useContext } from 'react'
// Lib
import { FaBars } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { GiStrong } from 'react-icons/gi'
import { Link } from 'react-router-dom'
// Components
import AsideMenu from './AsideMenu'
// layouts
// Contexts
import { UserContext } from '../contexts/UserContext'
// Styles
import '../styles/Navigation.scss'
const Navigation = () => {
	const [showMenu, setShowMenu] = useState(false)
	const { userID } = useContext(UserContext)
	const handleShowMenu = () => {
		setShowMenu(prevData => !prevData)
	}
	return (
		<nav className='nav'>
			<Link to='/'>
				<h1 className='nav__title'>
					GymApp <GiStrong />
				</h1>
			</Link>
			{userID && (
				<>
					<button onClick={handleShowMenu} className='nav__button'>
						{showMenu ? <FaXmark /> : <FaBars />}
					</button>
					<AsideMenu style={showMenu ? { left: 0 } : { left: '-100%' }} />
				</>
			)}
		</nav>
	)
}

export default Navigation
