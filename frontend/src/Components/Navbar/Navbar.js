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
        <nav className='navigation'>
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
        </nav>

        <div className='menu'>
          <img src={MenuIcon} alt='menu-icon'/>
          <span>MyFleet</span>
        </div>

        <nav className='navigation-mobile'>
          
          <div>
            <img className='close-icon' src={CloseIcon} alt='close-icon'/>
          </div>
          <div>
            <span>{user && user.email}</span>
          </div>
          
        
        { !user && (
            <div>
            
              <div>
                <NavLink to='/signup'>Signup</NavLink>
              </div>
              <div>
                <NavLink to='/login'>Login</NavLink>
              </div> 
              
                
            </div>
            )
        }
        
        {user &&
          <div>
            <span className='logout' onClick={()=>{logout()}}>Logout</span>
          </div>}
          <div>
            <NavLink to='/'>Home</NavLink>
          </div>
          <div>
              <NavLink to='/new-vehicle'>New Vehicle</NavLink>
            </div> 
        </nav>

    </header>
  )
}

export default Navbar