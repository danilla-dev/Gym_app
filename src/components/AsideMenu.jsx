// React
import React, { useContext, useEffect } from 'react'

// Lib
import { FaDumbbell, FaChartLine } from 'react-icons/fa'
import { GrPlan, GrLogout } from 'react-icons/gr'
import { IoMdSettings } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { GiStrong } from 'react-icons/gi'

// Components

// Layouts

//Contexts
import { UserContext } from '../contexts/UserContext'

// Styles
import '../styles/AsideMenu.scss'

const AsideMenu = ({ style }) => {
	const { userNick, logoutUser } = useContext(UserContext)
	return (
		<div style={style} className='aside-menu'>
			{/* <p className='aside-menu__user'>Hello {userNick} </p> */}
			<h1 className='nav__title'>
				GymApp <GiStrong />
			</h1>
			<Link to='/user/trainings'>
				<div className='aside-menu__training aside-menu__option'>
					<GrPlan />
					<p>Your trainings</p>
				</div>
			</Link>
			<Link to='/exercises'>
				<div className='aside-menu__exercises aside-menu__option'>
					<FaDumbbell />
					<p>Exercises</p>
				</div>
			</Link>
			<Link to='/user/stats'>
				<div className='aside-menu__stats aside-menu__option'>
					<FaChartLine />
					<p>Your stats</p>
				</div>
			</Link>
			<Link to='/user/settings'>
				<div className='aside-menu__settings aside-menu__option'>
					<IoMdSettings />
					<p>Settings</p>
				</div>
			</Link>
			<Link to={'/'} onClick={logoutUser}>
				<div className='aside-menu__logout aside-menu__option'>
					<GrLogout />
					<p>Logout</p>
				</div>
			</Link>
		</div>
	)
}

export default AsideMenu
