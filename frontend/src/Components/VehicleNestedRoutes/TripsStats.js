import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import Card from '../Card/Card'

export const TripsStats = () => {
  const { id } = useParams()
  const {user} = useAuthContext()
  const [ error , setError ] = useState('')
  const [ data, setData ] = useState({
    sum: 0,
    count: 0
  })
  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(`/api/trip/stats/${id}`, {
        headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const json = await response.json()
      
      
      if (json.success) {
        setData(prev => ({
          ...prev, 
          sum: json.stats[0].sum, 
          count: json.stats[0].count
        }))

        console.log('tyrip stats', json.stats)
      }else{
         setError(json.error)
         return
      }
    }

    if (user) {
      fetchTrips()
    }
  }, [])

  return (
    <div>
      {
        error ? (
          <h3>{error}</h3>
        ):(
          <>
          <Card>
            <span>Total Distance: {data.sum}</span>
            <br/>
            <span>Trips: {data.count}</span>
          </Card>
            
          </>  
        )
      }
    </div>
  )
}
