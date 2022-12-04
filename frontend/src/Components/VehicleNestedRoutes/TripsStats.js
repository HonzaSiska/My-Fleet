import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { parseMillisecondsIntoReadableTime } from '../../utils/utils'
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

        // filter data grouped by vehicle id
        const filteredData = json.stats.filter(item => item._id == id)[0]
       
        setData(prev => ({
          ...prev, 
          sum: filteredData.sum, 
          count: filteredData.count,
          averageTripDistance: filteredData.averageTripDistance,
          duration: parseMillisecondsIntoReadableTime(filteredData.duration)
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
            <span>Total Distance: <span className='bold'>{data.sum}</span></span>
            <br/>
            <span>Trips: <span className='bold'>{data.count}</span></span>
          </Card>
          <Card>
            <span>Total Duration: <span className='bold'>{data.duration}</span></span>
            <br/>
            <span>Average Trip Distance: <span className='bold'>{data.averageTripDistance}</span></span>
          </Card>
          
          </>  
        )
      }
    </div>
  )
}
