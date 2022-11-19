
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useVehiclesContext } from '../../hooks/useVehiclesContext'

import './Trips.css'
export const AllTrips = () => {

    const { user } = useAuthContext()
    const { dispatch, trips } = useVehiclesContext()
    const { id } = useParams()

    useEffect(() => {
        const fetchTrips = async () => {
            const response = await fetch(`/api/trip/all/${id}`, {
                headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
                method: 'POST',
            })
            const json = await response.json()
            console.log('trips', json)

            if (json.success) {
                dispatch({ type: 'SET_TRIPS', payload: json.trips })
            }
        }

        if (user) {
            fetchTrips()
        }

    }, [])
    return (
        <div className='trips'>
            {trips && (
                trips.map(trip => <p key={trip._id}>{trip.from} - {trip.to}</p>)
            )}
        </div>
    )
}
