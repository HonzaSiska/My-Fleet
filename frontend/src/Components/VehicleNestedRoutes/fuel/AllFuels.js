import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useVehiclesContext } from '../../../hooks/useVehiclesContext'
import Card from '../../Card/Card'
import Pagination from '../../Pagination/Pagination'
import EditIcon from '../../../assets/edit.svg'
import CheckedIcon from '../../../assets/checked.svg'
import CloseIcon from '../../../assets/close-icon.svg'
import './../Trips.css'
import Modal from '../../modal/Modal'
import { parseMillisecondsIntoReadableTime } from '../../../utils/utils'

const AllFuels = () => {
    const [page, setPage] = useState(0)
    const [results, setResults] = useState(0)
    const [recordsLeft, setRecordsLeft] = useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const { user } = useAuthContext()
    const { dispatch, fuels } = useVehiclesContext()
    const { id } = useParams()
    const [toBeDeleted, setToBeDeleted] = useState('')
    const [error, setError] = useState('')

    const resultsPerPage = 5

    const fetchFuels = async () => {
        const response = await fetch(`/api/fuel/all/${id}?page=${page}`, {
            headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
            method: 'POST',
        })
        const json = await response.json()

        if (json.success) {
            setResults(json.count)

            console.log('fuels', json.fuels)
        
            // calculate records left
            const left = results - ((page + 1) * 5)
            setRecordsLeft(left)
            dispatch({ type: 'SET_FUELS', payload: json.fuels })
            
        }
    }

    const openModal = (_trip_id) => {
        setModalIsOpen(!modalIsOpen)
        setToBeDeleted(_trip_id)

    }

    const handleDelete = (fuelId) => {

        const deleteFuel = async () => {
            const response = await fetch(`/api/fuel/delete/${fuelId}`, {
                headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
                method: 'POST',
            })
            const json = await response.json()
            if (json.success) {
                setModalIsOpen(!modalIsOpen)
                // navigate(`/vehicle/${id}/trips/all`)
                fetchFuels()
            } else {
                setError(json.error)
            }

        }

        if (user) {
            deleteFuel()
        }
    }

    useEffect(() => {
        if (user) {
            fetchFuels()
        }

    }, [page, results, recordsLeft])


    return (
        <div className='trips-wrapper'>
            {error && <div className='error'>{error}</div>}
            <div className='trips'>
                {fuels && (
                    fuels.map((fuel) => <Card key={fuel._id}>
                        <div>
                            <span className='card-title bold '>{fuel.location}</span>
                            {fuel.date && <span>{fuel.dateFormatted}</span>}

                        </div>
                        <div className='card-block-bottom'>
                            <div>
                                <span className='distance'>{`${fuel.amount} ${fuel.units}`}</span>
                                <span className='duration'>{' / price: ' +fuel.price}</span>
                            </div>


                            <NavLink onClick={() => dispatch({ type: 'CLOSE_MENU' })} to={`/vehicle/${id}/fuel/update/${fuel._id}`}><img src={EditIcon} alt='edit' /></NavLink>
                            <img onClick={() => openModal(fuel._id)} className='close-icon-dark' src={CloseIcon} alt='close-icon' />
                        </div>

                    </Card>)
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

export default AllFuels