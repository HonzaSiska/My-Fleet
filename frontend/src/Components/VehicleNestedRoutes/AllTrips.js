
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useVehiclesContext } from '../../hooks/useVehiclesContext'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import EditIcon from '../../assets/edit.svg'
import CheckedIcon from '../../assets/checked.svg'
import CloseIcon from '../../assets/close-icon.svg'
import './Trips.css'
import Modal from '../modal/Modal'
import { parseMillisecondsIntoReadableTime } from '../../utils/utils'
import Loader from '../Loader/Loader'


export const AllTrips = () => {

    const [ page, setPage ] = useState(0)
    const [ results, setResults ] = useState(0)
    const [ recordsLeft, setRecordsLeft ] = useState(0)
    const [ modalIsOpen, setModalIsOpen ] = useState(false)
    const { user } = useAuthContext()
    const { dispatch, trips, distanceUnits, volumeUnits,  } = useVehiclesContext()
    const { id } = useParams()
    const [ toBeDeleted , setToBeDeleted ] = useState('')
    const [ error, setError ] = useState('')



    const resultsPerPage = 5

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
            console.log('distance units', distanceUnits)
            const updatedTrip = json.trips.map(trip => {
                
                return {...trip, duration : parseMillisecondsIntoReadableTime(trip.duration), units: distanceUnits }
                
            })
            console.log('json', json.updatedTrip)
            dispatch({ type: 'SET_TRIPS', payload: updatedTrip })
        }
    }

    const openModal = (_trip_id) => {
        setModalIsOpen(!modalIsOpen)
        setToBeDeleted(_trip_id)

    }

    const handleDelete = (tripId) => {
        
        const deleteTrip = async () => {
            const response = await fetch(`/api/trip/delete/${tripId}`, {
                headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
                method: 'POST',
            })
            const json = await response.json()
            if (json.success) {
                setModalIsOpen(!modalIsOpen)
                // navigate(`/vehicle/${id}/trips/all`)
                fetchTrips()
            }else{
                setError(json.error)
            }
            
        }

        if (user) {
            deleteTrip()
        }
    }

    useEffect(() => {
        if (user) {
            fetchTrips()
        }

    }, [page, results, recordsLeft])

  
    return (
        <div className='trips-wrapper'>
            { error && <div className='error'>{error}</div> }
            <div className='trips'>
                {trips ? (
                    trips.map((trip) => <Card key={trip._id}>
                        <div>
                            <span className='card-title bold '>{trip.from} - {trip.to}</span>
                            { trip.date && <span>{trip.date}</span>}
                            
                        </div>
                        <div className='card-block-bottom'>
                            <div>
                                <span className='distance'>{`${trip.distance} ${trip.units}`}</span>
                                <span className='duration'>{' / ' +  trip.duration}</span>
                            </div>
                            
                            {
                                trip.completed 
                                ? <img src={CheckedIcon} alt={ CheckedIcon }/>
                                : <span style={{color: 'red',fontSize:'11px' }}>still open </span>
                            }
                            
                            <NavLink  onClick={()=>dispatch({type: 'CLOSE_MENU'})}  to={`/vehicle/${id}/trips/update/${trip._id}`}><img src={EditIcon} alt='edit'/></NavLink>
                            <img onClick={()=>openModal(trip._id)} className='close-icon-dark' src={CloseIcon} alt='close-icon'/>
                        </div>
                        
                    </Card>)
                ) : (
                    <Loader/>
                )}
                
                {
                    modalIsOpen && 
                    <Modal>
                        <div>
                            <div className='modal-top-section'>
                                <img onClick={()=>setModalIsOpen(!modalIsOpen)} src={CloseIcon} className='close-icon-light'/>
                            </div>
                            <div className='modal-bottom-section'>
                                <button onClick={()=>handleDelete(toBeDeleted)} className='confirm-btn'>Confirm</button>
                            </div>
                        </div>
                    </Modal>
                }
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
