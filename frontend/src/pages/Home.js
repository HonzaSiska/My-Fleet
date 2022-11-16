import React, { useEffect } from 'react'
import { useVehiclesContext } from "../hooks/useVehiclesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import VehiclesDetails from '../Components/Vehicles/VehiclesDetails'
 import './Home.css'
// import '../App.css'
// import './Auth/Auth.css'

function Home() {

  const {vehicles, dispatch} = useVehiclesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await fetch('/api/vehicle', {
        headers: {'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json'},
        method: 'POST',  
      })
      const json = await response.json()
      console.log('vehicles',json)
     
      if (json.success) {
        dispatch({type: 'SET_VEHICLES', payload: json.vehicles})
      }
    }

    if (user) {
      fetchVehicles()
    }
    
  }, [dispatch, user])

  return (
    <div>
      <div className='title'>
          <h2>Dashboard</h2>
      </div>
      
      <div className='vehicles'>
        { vehicles && vehicles.map(vehicle => (
          <VehiclesDetails key={vehicle._id} vehicle={vehicle}/>
        ))}
      </div>
    </div>
  )
}

export default Home