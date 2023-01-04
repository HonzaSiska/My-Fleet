import React from 'react'
import { useParams, Outlet, Link } from 'react-router-dom'
import { handleIsActive } from '../../utils/utils'

function Maintenance() {

  const {id} = useParams()
  return (
    <div>
      <nav className='nested-subroutes-wrapper'>
          <Link className='tab' to='new' onClick={handleIsActive}>New</Link>
          <Link className='tab  tab-active' to='all' onClick={handleIsActive}>All</Link>
          <Link className='tab' to='stats' onClick={handleIsActive}>Stats</Link>
          <Link className='tab' to='search' onClick={handleIsActive}>Search</Link>
          <Link className='tab' to='dates' onClick={handleIsActive}>Date Search</Link>
      </nav>
      <div className='sub-outlet'>
          <Outlet/>
      </div>
    </div>
  )
}

export default Maintenance