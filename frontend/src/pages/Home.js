import React, { useEffect } from 'react'
import { useVehiclesContext } from "../hooks/useVehiclesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import VehiclesDetails from '../Components/Vehicles/VehiclesDetails'
import './Home.css'
import Card from '../Components/Card/Card'
import { useState } from 'react'
import Loader from '../Components/Loader/Loader'
import Example from '../Components/Charts/Donut'


function Home() {

  const { vehicles, dispatch } = useVehiclesContext()
  const { user } = useAuthContext()
  const [isLoading, setIsLoading] = useState(false)
  const [isStatsLoading, setStatsIsLoading] = useState(false)
  const [stats, setStats] = useState({
    maintenance: null,
    fuel: null,

  })

  useEffect(() => {

    const fetchVehicles = async () => {
      setIsLoading(true)
      const response = await fetch('/api/vehicle', {
        headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const json = await response.json()
      console.log('vehicles', json)

      if (json.success) {
        dispatch({ type: 'SET_VEHICLES', payload: json.vehicles, allFuel: json.allFuel })
        setIsLoading(false)
      }
    }

    if (user) {
      fetchVehicles()
    }

  }, [dispatch, user])



  useEffect(() => {

    const fetchStats = async () => {
      setStatsIsLoading(true)
      const response = await fetch('/api/stats/all', {
        headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const json = await response.json()
      console.log('allstats', json)

      if (json.success) {
        setStats(prev => ({
          ...prev,
          maintenance: json.stats.maintenance[0].price,
          fuel: json.stats.fuel[0].price,


        }))
        setStatsIsLoading(false)
      }
    }

    if (user) {
      fetchStats()
    }

  }, [dispatch, user])


  return (
    <div>
      <div className='title'>
        <p>My Fleet</p>
      </div>
      {
        isLoading ?
          <Loader />
          : vehicles ? (
            <div className='vehicles'>
              {vehicles && vehicles.map((vehicle, index) => (
                <Card key={index}><VehiclesDetails vehicle={vehicle} /></Card>
              ))}
            </div>
          ): null
      }
      {
        isStatsLoading ?
          <Loader />
          : 
            stats ? (
            <Card>
              <div className='charts-container'>
                <Example data={[
                  { name: 'maintenance', value: stats.maintenance },
                  { name: 'fuel', value: stats.fuel }
                ]} />

              </div>
            </Card>
          ): null
          
          
      }





    </div>
  )
}

export default Home