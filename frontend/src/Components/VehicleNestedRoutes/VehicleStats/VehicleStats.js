import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useVehiclesContext } from '../../../hooks/useVehiclesContext'
import Card from '../../Card/Card'
import Loader from '../../Loader/Loader'


const VehicleStats = () => {

    const [data, setData] = useState({
        totalHours: null,
        totalMinutes: null,
        costPerDay: null,
        costPerHour: null,
        costPerMinute: null,
        totalCost: null,
        totalPrice: null,
        totalCostAndPrice: null,
        pricePerDistance: null,
        totalDistance: null

    })


    const { user } = useAuthContext()
    const { distanceUnits } = useVehiclesContext()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {


        setIsLoading(true)
        const fetchStats = async () => {
            const response = await fetch(`/api/stats/${id}`, {
                headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
                method: 'POST',
            })

            const json = await response.json()

            if (json.success) {

                setData(prev => ({
                    ...prev,
                    totalHours: json.stats._hours,
                    totalMinutes: json.stats._minutes,
                    costPerDay: json.stats._pricePerDay,
                    costPerHour: json.stats._pricePerHour,
                    costPerMinute: json.stats._pricePerMinute,
                    totalCost: json.stats._totalCost,
                    totalPrice: json.stats._totalPrice,
                    totalCostAndPrice:json.stats._totalCostAndPrice,
                    pricePerDistance: json.stats._pricePerDistance,
                    totalDistance: json.stats._totalDistance
                }))

                console.log(' stats', json.stats)
                setIsLoading(false)

            } else {
                setError(json.error)
                return
            }
        }

        if (user) {
            fetchStats()
        }
    }, [])



    return (
        <div>

            {
                isLoading

                    ? <Loader />
                    : data ?
                        (<>
                            <Card>
                                <span>Total Hours: <span className='bold'>{data.totalHours}</span></span>
                                <br />
                                <span>Total Minutes: <span className='bold'>{data.totalMinutes}</span></span>
                                <br />
                                <span>Total Distance: <span className='bold'>{data.totalDistance}</span>{` ${distanceUnits}`}</span>
                                <br />
                            </Card>
                            <Card>
                                <span>Cost per day: <span className='bold'>{data.costPerDay}</span></span>
                                <br />
                                <span>Cost per hour: <span className='bold'>{data.costPerHour}</span></span>
                                <br />
                                <span>Cost per minute: <span className='bold'>{data.costPerMinute}</span></span>
                                <br />
                                <span>Cost per {` ${distanceUnits}`}: <span className='bold'>{data.pricePerDistance}</span></span>
                                <br />
                            </Card>
                            <Card>
                                <span>Total Cost: <span className='bold'>{data.totalCostAndPrice}</span></span>
                                <br />
                                
                            </Card>
                        </>)
                        : null
            }

        </div>
    )
}

export default VehicleStats