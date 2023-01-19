import React, { useState } from 'react'
import { useEffect } from 'react'
import { useVehiclesContext } from '../../../hooks/useVehiclesContext'
import { useAuthContext } from '../../../hooks/useAuthContext'
import SearchIcon from '../../../assets/lupa.svg'
import { NavLink, useParams } from 'react-router-dom'
import { parseMillisecondsIntoReadableTime } from '../../../utils/utils'
import EditIcon from '../../../assets/edit.svg'
import FoundMaintenance from './FoundMaintenance'
import Loader from '../../Loader/Loader'

const DateMaintenance = () => {

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [foundRecords, setFoundRecords] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState(0)
    const { user } = useAuthContext()
    const { dispatch, trips } = useVehiclesContext()
    const { id } = useParams()

    const fetchMaintenance = async () => {

        if (!startDate || !endDate) return
        setIsLoading(true)
        const response = await fetch(`/api/maintenance/dates/${id}?start=${startDate}&end=${endDate}`, {
            headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
            method: 'POST',
        })
        const json = await response.json()

        if (json.success) {
            console.log('search by date', json)

            setResults(json.count)
            setFoundRecords(json.maintenance)
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
                    <img className='lupa' onClick={fetchMaintenance} src={SearchIcon} alt='SearchIcon' />
                </form>
            </div>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className='results-group'>
                        <FoundMaintenance foundRecords={foundRecords} id={id} />
                    </div>
                )
            }

        </div>
    )
}

export default DateMaintenance