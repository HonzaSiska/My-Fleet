
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useVehiclesContext } from '../../hooks/useVehiclesContext'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import EditIcon from '../../assets/edit.svg'

import './Trips.css'
export const AllTrips = () => {

    const [ page, setPage ] = useState(0)
    const [ results, setResults ] = useState(0)
    const [ recordsLeft, setRecordsLeft ] = useState(0)
    const { user } = useAuthContext()
    const { dispatch, trips } = useVehiclesContext()
    const { id } = useParams()

    const resultsPerPage = 5

    useEffect(() => {
        const fetchTrips = async () => {
            const response = await fetch(`/api/trip/all/${id}?page=${page}`, {
                headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
                method: 'POST',
            })
            const json = await response.json()
            
            if (json.success) {
                setResults(json.count)
                
                console.log('json', json.trips)
                // calculate records left
                const left = results - ((page +1) * 5 )
                setRecordsLeft(left)

                dispatch({ type: 'SET_TRIPS', payload: json.trips })
            }
        }

        if (user) {
            fetchTrips()
        }

    }, [page, results, recordsLeft])

  
    return (
        <div className='trips-wrapper'>
            <div className='trips'>
                {trips && (
                    trips.map(trip => <Card key={trip._id}>
                        <div>
                            <span className='card-title'>{trip.from} - {trip.to}</span>
                            <span>{trip.date}</span>
                        </div>
                        <div className='card-block-bottom'>
                            <span>{`${trip.distance} ${trip.units}`}</span>
                            <img src={EditIcon} alt='edit'/>
                        </div>
                        
                    </Card>)
                )}
            </div>
            <Pagination 
                setPage={setPage}
                results={results}
                page={page}
                recordsLeft={recordsLeft}
                resultsPerPage={resultsPerPage}
                extended={true}
            />
        </div>
    )
}
