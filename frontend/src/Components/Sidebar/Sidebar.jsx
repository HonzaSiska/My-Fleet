import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import CloseIcon from '../../assets/close-icon.svg'
import './Sidebar.css'

function Sidebar() {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  return (
    <>
        <nav className='navigation'>
          
          <div>
            <img className='close-icon' src={CloseIcon} alt='close-icon'/>
          </div>
          <div>
            <span>{user && user.email}</span>
          </div>
          
        
            { !user && 
                <div>
                
                <div>
                    <NavLink to='/signup'>Signup</NavLink>
                </div>
                <div>
                    <NavLink to='/login'>Login</NavLink>
                </div> 
                
                    
                </div>  
            }
        
            {user && 
            <div>
                <span className='logout' onClick={()=>{logout()}}>Logout</span>
                <div>
                <NavLink to='/'>Home</NavLink>
            </div>
            <div>
                <NavLink to='/new-vehicle'>New Vehicle</NavLink>
            </div> 
            </div>}
            
        </nav>
    </>
  )
}

export default Sidebar