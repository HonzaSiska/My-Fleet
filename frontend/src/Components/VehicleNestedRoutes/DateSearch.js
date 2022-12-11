import React, { useState } from 'react'
import { useEffect } from 'react'
import { useVehiclesContext } from '../../hooks/useVehiclesContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import  SearchIcon   from '../../assets/lupa.svg'
import { NavLink, useParams } from 'react-router-dom'
import { parseMillisecondsIntoReadableTime } from '../../utils/utils'
import EditIcon from '../../assets/edit.svg'
import FoundTrips from './FoundTrips'


export const DateSearch = () => {

  const [ startDate, setStartDate ] = useState('')
  const [ endDate, setEndDate ] = useState('')
  const [ foundTrips, setFoundTrips ] = useState([])
  const [ results, setResults ] = useState(0)
  const { user } = useAuthContext()
  const {dispatch, trips } = useVehiclesContext()
  const { id } = useParams()

  const fetchTrips = async () => {
    
    const response = await fetch(`/api/trip/dates/${id}?start=${startDate}&end=${endDate}`, {
        headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
        method: 'POST',
    })
    const json = await response.json()
    
    if (json.success) {
        
        setResults(json.count)

        const updatedTrips = json.trips.map(trip => {
            return {...trip, duration : parseMillisecondsIntoReadableTime(trip.duration)}
        })
        
        setFoundTrips(updatedTrips)
    }
}



  

return (
    <div className='trips-wrapper'>
        <div className='search-forms'>
            {/* search by date */}

            <form className='date-search-form'>
                <div>
                    <div className='input-group'>
                        <label>Start date</label>
                        <input 
                            type='datetime-local' 
                            onChange={(e)=> setStartDate(e.target.value)}
                            value={startDate}
                        />
                    </div>
                    <div className='input-group'>
                        <label>End Date</label>
                        <input 
                            type='datetime-local'
                            onChange={(e)=> setEndDate(e.target.value)}
                            value={endDate}
                        />
                    </div>
                </div>
                <img className='lupa' onClick={fetchTrips} src={SearchIcon} alt='SearchIcon'/>
            </form>

        </div>
        {/* <div>
            { results > 0 ??<span>Found: <span className='bold'>{results}</span></span>}
        </div> */}
        <div className='results-group'>
            <FoundTrips trips={foundTrips} id={id}/>
        </div>
    </div>
  )

}
