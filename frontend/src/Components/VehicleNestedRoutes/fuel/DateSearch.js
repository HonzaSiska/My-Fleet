import React, { useState } from 'react'
import { useEffect } from 'react'
import { useVehiclesContext } from '../../../hooks/useVehiclesContext'
import { useAuthContext } from '../../../hooks/useAuthContext'
import SearchIcon from '../../../assets/lupa.svg'
import { NavLink, useParams } from 'react-router-dom'
import { parseMillisecondsIntoReadableTime } from '../../../utils/utils'
import EditIcon from '../../../assets/edit.svg'
import FoundFuels from './FoundFuels'
import Loader from '../../Loader/Loader'

const FuelDateSearch = () => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [foundFuels, setFoundFuels] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState(0)
    const { user } = useAuthContext()
    const { dispatch, trips } = useVehiclesContext()
    const { id } = useParams()

    const fetchFuels = async () => {

        if (!startDate || !endDate) return
        setIsLoading(true)
        const response = await fetch(`/api/fuel/dates/${id}?start=${startDate}&end=${endDate}`, {
            headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
            method: 'POST',
        })
        const json = await response.json()

        if (json.success) {
            console.log('seatch by date', json)

            setResults(json.count)

            setFoundFuels(json.fuels)
            setIsLoading(false)
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
                                type='date'
                                onChange={(e) => setStartDate(e.target.value)}
                                value={startDate}
                            />
                        </div>
                        <div className='input-group'>
                            <label>End Date</label>
                            <input
                                type='date'
                                onChange={(e) => setEndDate(e.target.value)}
                                value={endDate}
                            />
                        </div>
                    </div>
                    <img className='lupa' onClick={fetchFuels} src={SearchIcon} alt='SearchIcon' />
                </form>
            </div>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className='results-group'>
                        <FoundFuels fuels={foundFuels} id={id} />
                    </div>
                )
            }

        </div>
    )
}

export default FuelDateSearch