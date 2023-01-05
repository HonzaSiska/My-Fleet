import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Card from '../../Card/Card'
import Loader from '../../Loader/Loader'

const MaintenanceStats = () => {
    const { id } = useParams()
    const { user } = useAuthContext()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({
        count: 0
    })

    useEffect(() => {
        const fetchMaintenance = async () => {
            const response = await fetch(`/api/maintenance/stats/${id}`, {
                headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
                method: 'POST',
            })
            const json = await response.json()


            if (json.success) {

                // filter data grouped by vehicle id
                const filteredData = json.stats.filter(item => item._id === id)[0]

                setData(prev => ({
                    ...prev,
                    price: filteredData.price,
                    count: filteredData.count,
                    averagePrice: filteredData.averagePrice
                }))

                console.log('maintenance stats', json.stats)
                setIsLoading(false)
            } else {
                setError(json.error)
                return
            }
        }

        if (user) {
            fetchMaintenance()
        }
    }, [id, user])

    return (
        <div>
            {   
                isLoading ? (<Loader />) :
                error ? (
                    <h3>{error}</h3>
                ) : (
                    <>  
                        <Card>
                            <span>Total Count: <span className='bold'>{data.count}</span></span>
                        </Card>
                        <Card>
                            <span>Total Price: <span className='bold'>{data.price}</span></span>
                        </Card>
                        <Card>
                            <span>Average Price: <span className='bold'>{data.averagePrice}</span></span>
                        </Card>

                    </>
                )
            }
        </div>
    )
}

export default MaintenanceStats