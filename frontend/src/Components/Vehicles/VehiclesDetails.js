import React from 'react'
import './Vehicle.css'
import { NavLink } from 'react-router-dom'
import { useVehiclesContext } from '../../hooks/useVehiclesContext'

function VehiclesDetails({ vehicle }) {
  const { make, model, year, _id} = vehicle
  const { dispatch } = useVehiclesContext()

  return (
    <div className='vehicle'>
        <span >{`${make} `}</span>
        <span>{`${model} `}</span>
        <span>{`${year}`}</span>
        <NavLink  onClick={()=>dispatch({type: 'CLOSE_MENU'})} className='alink' to={`/vehicle/${_id}/trips/all`}>details</NavLink>
    </div>
  )
}
export default VehiclesDetails