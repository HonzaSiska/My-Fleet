import React from 'react'
import './Vehicle.css'
import { NavLink } from 'react-router-dom'
import { useVehiclesContext } from '../../hooks/useVehiclesContext'


function VehiclesDetails({ vehicle }) {
  const { make, model, year, _id} = vehicle
  const { dispatch } = useVehiclesContext()

  return (
    <div className='vehicle left-border-thick'>
        <div>
          <span className='bold'>{`${make} `}</span>
          <span>{`${model} `}</span>
          <span>{`${year}`}</span>
        </div>
        <div className='details-link'>
          <NavLink  onClick={()=>dispatch({type: 'CLOSE_MENU'})}  to={`/vehicle/${_id}/trips/all`}><span className='details-btn'>details</span></NavLink>
        </div>
        
    </div>
  )
}
export default VehiclesDetails