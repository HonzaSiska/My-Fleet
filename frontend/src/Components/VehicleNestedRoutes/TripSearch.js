import React, { useState } from 'react'
import { useEffect } from 'react'
import { useVehiclesContext } from '../../hooks/useVehiclesContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import  SearchIcon   from '../../assets/lupa.svg'
import { NavLink, useParams } from 'react-router-dom'
import { parseMillisecondsIntoReadableTime } from '../../utils/utils'
import EditIcon from '../../assets/edit.svg'

import FoundTrips from './FoundTrips'
import Loader from '../Loader/Loader'

const TripSearch = () => {

  const [ canFetch, setCanFetch] = useState( false )
  const [ keyword, setKeyword ] = useState('')
  const [ page, setPage ] = useState(0)
  const [ foundTrips, setFoundTrips ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ results, setResults ] = useState(0)
  const { user } = useAuthContext()
  const {dispatch, trips } = useVehiclesContext()
  const { id } = useParams()



  const handleKeywordSearch = (keyword) => {
    !canFetch && setCanFetch(true)
    setKeyword(keyword)
  }



  const fetchTrips = async () => {
    setIsLoading(true)
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
        setIsLoading(false)
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
        {
            isLoading ? (
                <Loader/>
            ) : (
                <div className='results-group'>
                    <FoundTrips trips={foundTrips} id={id}/>
                </div>
            )
        }
    </div>
  )
}

export default TripSearch