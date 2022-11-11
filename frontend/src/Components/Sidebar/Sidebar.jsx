import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useVehiclesContext } from '../../hooks/useVehiclesContext'
import CloseIcon from '../../assets/close-icon.svg'
import './Sidebar.css'

function Sidebar() {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const { dispatch , isOpenMenu } = useVehiclesContext()
  return (
    <>
        {/* <nav className={isOpenMenu ? 'navigation open-menu' : 'navigation close-menu'}> */}
        <nav className='navigation'>
          
          <div>
            <p className='user'> {user && user.email}</p>
          </div>
            { !user && 
                <div>
                    <NavLink className='alink' to='/signup' end>Signup</NavLink>
                    <NavLink className='alink' to='/login' end>Login</NavLink> 
                </div>  
            }
            {user && 
            <div>
                <div className='alink logout-wrapper'>
                    <span className='logout' onClick={()=>{logout()}}>Logout</span>
                </div>
                <NavLink className='alink ' to='/' end>Home</NavLink>
                <NavLink className='alink' to='/new-vehicle'>New Vehicle</NavLink>
            </div>}
            
        </nav>


        
    </>
  )
}

export default Sidebar