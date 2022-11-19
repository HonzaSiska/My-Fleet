import React from 'react'
import { useParams, Outlet, Link } from 'react-router-dom'


function Trips() {

  const {id} = useParams()
  const handleIsActive = (e) => {
      const links = document.querySelectorAll('.tab')
      links.forEach(link=> {
          console.log(link)
          link.classList.remove('tab-active')
          
      })
      e.target.classList.add('tab-active')
  }
 
  return (
    <div>
      <nav className='nested-subroutes-wrapper'>
          <Link className='tab' to='new' onClick={handleIsActive}>New</Link>
          <Link className='tab  tab-active' to='all' onClick={handleIsActive}>All Trips</Link>
          <Link className='tab' to='stats' onClick={handleIsActive}>Stats</Link>
      </nav>
      <div className='sub-outlet'>
          <Outlet/>
      </div>
    </div>

    
  )
}

export default Trips