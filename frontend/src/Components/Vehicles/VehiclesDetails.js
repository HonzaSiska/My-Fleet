import React from 'react'
import './Vehicle.css'

function VehiclesDetails({ vehicle }) {
  const { make, model, year} = vehicle

  return (
    <div className='vehicle'>
        <span>{`${make} `}</span>
        <span>{`${model} `}</span>
        <span>{`${year}`}</span>
    </div>
  )
}

export default VehiclesDetails