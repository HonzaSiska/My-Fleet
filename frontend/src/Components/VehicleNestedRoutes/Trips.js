import React from 'react'
import { useParams } from 'react-router-dom'
import './VehicleNestedRoutes.css'

function Trips() {
  const {id} = useParams()
  return (
    <div>Trips {id}</div>
  )
}

export default Trips