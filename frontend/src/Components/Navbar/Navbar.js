import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useVehiclesContext } from '../../hooks/useVehiclesContext'
import './Navbar.css'
import MenuIcon from '../../assets/hamburger.svg'
import CloseIcon from '../../assets/close-icon.svg'


function Navbar() {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const { dispatch, isOpenMenu } = useVehiclesContext()
  
  return (
    <header>
    {isOpenMenu}
        <div className='menu'>
          <img onClick={()=>dispatch({type: 'OPEN_MENU'})} className='menu-icon' src={MenuIcon} alt='menu-icon'/>
          <span className='logo'>My<sup>Fleet</sup></span>
        </div>

        <nav className={isOpenMenu ? 'navigation-mobile open-menu' : 'navigation-mobile close-menu'}>
          <div className='close-icon-wrapper'>
            <img onClick={()=>dispatch({type: 'CLOSE_MENU'})} className='close-icon'  src={CloseIcon} alt='close-icon'/>
          </div>
          <div>
            <p className='user'> {user && user.email}</p>
          </div>
            { !user && 
                <div>
                  <NavLink onClick={()=>dispatch({type: 'CLOSE_MENU'})} className='alink' to='/signup' end>Signup</NavLink>
                  <NavLink onClick={()=>dispatch({type: 'CLOSE_MENU'})} className='alink' to='/login' end>Login</NavLink>
                </div>  
            }
            {user && 
            <div>
                <div className='alink logout-wrapper'>
                    <span className='logout' onClick={()=>{logout()}}>Logout</span>
                </div>
                <NavLink onClick={()=>dispatch({type: 'CLOSE_MENU'})} className='alink ' to='/' end>Home</NavLink>
                <NavLink  onClick={()=>dispatch({type: 'CLOSE_MENU'})} className='alink' to='/new-vehicle'>New Vehicle</NavLink>
            </div>}
            
        </nav>

        

    </header>
  )
}

export default Navbar