import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useVehiclesContext } from '../../../hooks/useVehiclesContext'
import Card from '../../Card/Card'
import Pagination from '../../Pagination/Pagination'
import EditIcon from '../../../assets/edit.svg'
import CloseIcon from '../../../assets/close-icon.svg'
import './../Trips.css'
import Modal from '../../modal/Modal'
import './../fuel/Fuel.css'
import Loader from '../../Loader/Loader'

const AllMaintenance = () => {

    const [page, setPage] = useState(0)
    const [results, setResults] = useState(0)
    const [recordsLeft, setRecordsLeft] = useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const { user } = useAuthContext()
    const { dispatch, maintenance } = useVehiclesContext()
    const { id } = useParams()
    const [toBeDeleted, setToBeDeleted] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const resultsPerPage = 5

    const fetchMaintenance = async () => {
        setIsLoading(true)
        const response = await fetch(`/api/maintenance/all/${id}?page=${page}`, {
            headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
            method: 'POST',
        })
        const json = await response.json()

        if (json.success) {
            setResults(json.count)

            console.log('maintenance', json.maintenance)
        
            // calculate records left
            const left = results - ((page + 1) * 5)
            setRecordsLeft(left)
            setIsLoading(false)
            dispatch({ type: 'SET_MAINTENANCE', payload: json.maintenance })

            
        }
    }

    const openModal = (_trip_id) => {
        setModalIsOpen(!modalIsOpen)
        setToBeDeleted(_trip_id)

    }

    const handleDelete = () => {
        setModalIsOpen(!modalIsOpen)
        alert('deleted')
        
    }

    useEffect(() => {
        if (user) {
            fetchMaintenance()
        }

    }, [page, results, recordsLeft, user])

    
    return (
        <div className='trips-wrapper'>
            {error && <div className='error'>{error}</div>}
            <div className='trips'>
                {maintenance ? (
                    maintenance.map((item) => <Card key={item._id}>
                        <div>
                            <span className='card-title bold '>{item.location}</span>
                            {item.date && <span>{item.dateFormatted}</span>}

                        </div>
                        <div className='card-block-bottom-fuel'>
                            <div>
                                {/* <span className='distance'>{`${item.amount} ${item.units}`}</span> */}
                                <span className='duration'>{'price: ' +item.price}</span>
                            </div>


                            <NavLink onClick={() => dispatch({ type: 'CLOSE_MENU' })} to={`/vehicle/${id}/maintenance/update/${item._id}`}><img src={EditIcon} alt='edit' /></NavLink>
                            <img onClick={() => openModal(item._id)} className='close-icon-dark' src={CloseIcon} alt='close-icon' />
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
                                <img onClick={() => setModalIsOpen(!modalIsOpen)} src={CloseIcon} className='close-icon-light' />
                            </div>
                            <div className='modal-bottom-section'>
                                <button onClick={() => handleDelete(toBeDeleted)} className='confirm-btn'>Confirm</button>
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

export default AllMaintenance