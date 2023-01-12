import React, { useEffect } from 'react'
import { useVehiclesContext } from "../hooks/useVehiclesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import VehiclesDetails from '../Components/Vehicles/VehiclesDetails'
import './Home.css'
import Card from '../Components/Card/Card'
import { useState } from 'react'
import Loader from '../Components/Loader/Loader'

function Home() {

  const {vehicles, dispatch} = useVehiclesContext()
  const {user} = useAuthContext()
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {

    const fetchVehicles = async () => {
      setIsLoading(true)
      const response = await fetch('/api/vehicle', {
        headers: {'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json'},
        method: 'POST',  
      })
      const json = await response.json()
      console.log('vehicles',json)
     
      if (json.success) {
        dispatch({type: 'SET_VEHICLES', payload: json.vehicles})
        setIsLoading(false)
      }
    }

    if (user) {
      fetchVehicles()
    }
    
  }, [dispatch, user])

  return (
    <div>
      <div className='title'>
          <p>My Fleet</p>
      </div>
      {
        isLoading ?    
          <Loader/> 
        : (
          <div className='vehicles'>
            { vehicles && vehicles.map((vehicle, index) => (
              <Card key={index}><VehiclesDetails  vehicle={vehicle}/></Card>
            ))}
          </div>
        )
      }
      <div className='title'>
          <p>Rentals</p>
      </div>
      
    </div>
  )
}

export default Home