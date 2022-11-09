import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import './Navbar.css'
import MenuIcon from '../../assets/hamburger.svg'
import CloseIcon from '../../assets/close-icon.svg'


function Navbar() {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  return (
    <header>
        {/* <nav className='navigation'>
        <NavLink to='/'>Home</NavLink>
        { !user && (
            <>
                <NavLink to='/signup'>Signup</NavLink>
                <NavLink to='/login'>Login</NavLink>
                
            </>
            )
        }
        <NavLink to='/new-vehicle'>New Vehicle</NavLink>
        
        {user &&<span className='logout' onClick={()=>{logout()}}>Logout</span>}
        </nav> */}

        <div className='menu'>
          <img className='menu-icon' src={MenuIcon} alt='menu-icon'/>
          <span>MyFleet</span>
        </div>

        

    </header>
  )
}

export default Navbar