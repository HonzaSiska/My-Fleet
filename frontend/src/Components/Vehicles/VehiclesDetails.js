import React from 'react'
import './Vehicle.css'

function VehiclesDetails({ vehicle }) {
  const { make, model, year} = vehicle

  return (
    <div className='vehicle'>
        <h4>{`${make} ${model} ${year}`}</h4>
    </div>
  )
}

export default VehiclesDetails