import React from 'react'
import './Vehicle.css'

function VehiclesDetails({ vehicle }) {
  const { make, model, year} = vehicle

  return (
    <div className='vehicle'>
        <h3>{`${make} ${model} ${year}`}</h3>
    </div>
  )
}

export default VehiclesDetails