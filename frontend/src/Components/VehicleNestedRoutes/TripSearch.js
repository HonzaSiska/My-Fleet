import React, { useState } from 'react'
import { useEffect } from 'react'
import { useVehiclesContext } from '../../hooks/useVehiclesContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import  SearchIcon   from '../../assets/lupa.svg'
import { useParams } from 'react-router-dom'
import { parseMillisecondsIntoReadableTime } from '../../utils/utils'



const TripSearch = () => {

  const [ canFetch, setCanFetch] = useState( false )
  const [ startDate, setStartDate ] = useState('')
  const [ endDate, setEndDate ] = useState('')
  const [ keyword, setKeyword ] = useState('')
  const [ page, setPage ] = useState(0)
  const [ recordsLeft,  setRecordsLeft ] = useState(0)
  const [ results, setResults ] = useState(0)
  const [ foundTrips, setFoundTrips ] = useState([])
  const [ isKeywordSearch , setIsKeywordSearch ] = useState(false)
  const [ isDateSearch, setIsDateSearch ] = useState(false)  

  const { user } = useAuthContext()
  const {dispatch, trips } = useVehiclesContext()
  const { id } = useParams()

  const resultsPerPage = 3

  const handleKeywordSearch = (keyword) => {
    setIsKeywordSearch(true)
    setIsDateSearch(false)
    !canFetch && setCanFetch(true)
    //if(!canFetch) setCanFetch(true)
    setKeyword( keyword)
  }

  const submitDateSearch = () => {
    setIsDateSearch(true)
    setIsKeywordSearch(false)
    setPage(0)
    // if use effect doesnt fire automatically
    
    //fetchTrips()
  }
  const fetchTrips = async () => {

    const response = await fetch(`/api/trip/keyword/${id}?page=${page}&keyword=${keyword}&startdate=${startDate}&enddate=${endDate}&datesearch=${isDateSearch}&keywordsearch=${isKeywordSearch}`, {
        headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
        method: 'POST',
    })
    const json = await response.json()
    
    if (json.success) {
        setResults(json.count)
        
        console.log('json', json.trips)

        // calculate records left
        const left = results - (( page +1 ) * resultsPerPage )

        setRecordsLeft(left)

        const updatedTrips = json.trips.map(trip => {
            
            return {...trip, duration : parseMillisecondsIntoReadableTime(trip.duration)}
            
        })
        setFoundTrips([...foundTrips, updatedTrips])

        // dispatch({ type: 'SET_TRIPS', payload: updatedTrips })
    }
}

  useEffect(() => {
    if(user  &&  canFetch){
        fetchTrips()
    }
  },[keyword, page])

  return (
    <div className='trips-wrapper'>
        <div className='search-forms'>
            { canFetch ? 'canFetch': 'can not fetch'}
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
                <img className='lupa' src={SearchIcon} alt='SearchIcon'/>
            </form>

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
        <div className=''>
            {
                foundTrips && 
                    foundTrips.map((trip)=>(
                        <div key={trip.from}>
                            <span >{trip.from}</span>
                            <br/>
                        </div>    
                    ))
            }
        </div>
        <div>
            {
                recordsLeft > resultsPerPage && <button onClick={()=> setPage(page+ 1)}>Load more ...</button>
            }
        </div>
    </div>
  )
}

export default TripSearch