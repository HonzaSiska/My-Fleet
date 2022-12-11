import React, { useState } from 'react'
import { useEffect } from 'react'
import { useVehiclesContext } from '../../hooks/useVehiclesContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import  SearchIcon   from '../../assets/lupa.svg'
import { NavLink, useParams } from 'react-router-dom'
import { parseMillisecondsIntoReadableTime } from '../../utils/utils'
import EditIcon from '../../assets/edit.svg'

import FoundTrips from './FoundTrips'

const TripSearch = () => {

  const [ canFetch, setCanFetch] = useState( false )
//   const [ startDate, setStartDate ] = useState('')
//   const [ endDate, setEndDate ] = useState('')
  const [ keyword, setKeyword ] = useState('')
  const [ page, setPage ] = useState(0)
  const [ recordsLeft,  setRecordsLeft ] = useState(0)
  const [ results, setResults ] = useState(0)
  const [ foundTrips, setFoundTrips ] = useState([])


  const { user } = useAuthContext()
  const {dispatch, trips } = useVehiclesContext()
  const { id } = useParams()



  const handleKeywordSearch = (keyword) => {
    !canFetch && setCanFetch(true)
    setKeyword(keyword)
  }



  const fetchTrips = async () => {
    
    const response = await fetch(`/api/trip/search/${id}?page=${page}&keyword=${keyword}`, {
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

  useEffect(() => {
    if(user  &&  canFetch && keyword){
        fetchTrips()
    }
  },[keyword])

  return (
    <div className='trips-wrapper'>
        <div className='search-forms'>
            {/* search by date */}

            {/* <form className='date-search-form'>
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
                <img className='lupa' onClick={submitDateSearch} src={SearchIcon} alt='SearchIcon'/>
            </form> */}

            {/* search by keyword */}

            <form className='trip-search-form'>
                <div className='input-group'>
                    <label>Search by place</label>
                    <input 
                        className='round-corners-large' 
                        type='text'
                        onChange={(e)=> handleKeywordSearch(e.target.value)}
                    />
                </div>    
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

export default TripSearch