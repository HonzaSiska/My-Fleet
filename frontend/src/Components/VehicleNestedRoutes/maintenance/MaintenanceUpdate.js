import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { formatDate } from '../../../utils/utils'

const MaintenanceUpdate = () => {

    const { id } = useParams()
    const { maintenanceId } = useParams()


    const [date, setDate] = useState('')
    const [price, setPrice] = useState(0)
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const { user } = useAuthContext()

    const [validator, setValidator] = useState({
        date: false,
        location: false,
        price: false,
        description: false,

    })

    const navigate = useNavigate()

    //  remove tab highlights
    const links = document.querySelectorAll('.tab')
    links.forEach(link => {
        console.log(link)
        link.classList.remove('tab-active')

    })

    useEffect(() => {


        const fetchMaintenance = async () => {
            const response = await fetch(`/api/maintenance/${maintenanceId}`, {
                headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
                method: 'POST',
            })

            const json = await response.json()

            if (json.success) {

                const { maintenance } = json

                console.log('received maintenance', maintenance)

                // convert to date 
                const newDate = new Date(maintenance.date)
              
                maintenance.date && setDate(formatDate(newDate))
                maintenance.price && setPrice(maintenance.price)
                maintenance.description && setDescription(maintenance.description)
                maintenance.location && setLocation(maintenance.location)

                setError('')


                //set all validfators to true to et rid of validation messages
                // for (let key in validator) {
                //     console.log([key])
                //     validator[key] = true
                // }


                maintenance.date && setValidator(validator.date = true)
                maintenance.price && setValidator(validator.price = true)
                maintenance.description && setValidator(validator.description = true)
                maintenance.location && setValidator(validator.location = true)

                console.log('validator after fetch', validator)


            }
        }

        if (user) {
            fetchMaintenance()
        }

    }, [user, maintenanceId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            validator.date === false ||
            validator.price === false ||
            validator.location === false ||
            validator.description === false
        ) {
            return
        }

        const maintenance = { _id: maintenanceId, date, price, location, description }

        const response = await fetch('/api/maintenance/update', {
            method: 'POST',
            body: JSON.stringify(maintenance),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        console.log('rsesponse', json)

        if (!json.success) {
            setError(json.error)
        }

        if (json.success) {
            setDescription('')
            setDate('')
            setPrice('')
            setLocation('')
            setValidator(prev => ({ ...prev, location: false, date: false, description: false, price: false }))
            navigate(`/vehicle/${id}/maintenance/all`)
        }

    }

    const handleDateChange = (value) => {
        setDate(value)
        setValidator(prev => ({ ...prev, date: true }))
    }

    const handleLocationChange = (value) => {
        setLocation(value)
        if (value) {
            setValidator(prev => ({ ...prev, location: true }))
        } else {
            setValidator(prev => ({ ...prev, location: false }))
        }
    }


    const handlePriceChange = (value) => {
        setPrice(value)

        if (value && !isNaN(value)) {
            setValidator(prev => ({ ...prev, price: true }))
        }
        if (value && isNaN(value)) {
            setValidator(prev => ({ ...prev, price: false }))
        }
        if (!value) {
            setValidator(prev => ({ ...prev, price: false }))
        }

    }

    const handleDescriptionChange = (value) => {
        setDescription(value)
        if (value) {
            setValidator(prev => ({ ...prev, description: true }))
        } else {
            setValidator(prev => ({ ...prev, description: false }))
        }
    }

    return (
        <div>
            <div className='form-wrapper'>
                <form onSubmit={handleSubmit} className='form-content'>
                    {error &&
                        (
                            <div className='error'>
                                <span>{error}</span>
                            </div>
                        )
                    }
                    <label>Date</label>
                    <br />
                    <input
                        type='date'
                        onChange={((e) => { handleDateChange(e.target.value) })}
                        value={date}
                    />
                    <div className='validator'>
                        <span>{(validator.date =='') && <span>{`* Required`}</span>}</span>
                    </div>
                    <label>Location</label>
                    <br />
                    <input
                        type='text'
                        onChange={((e) => { handleLocationChange(e.target.value) })}
                        value={location}
                    />
                    <div className='validator'>
                        <span>{(validator.location == '') && <span>{`* Required`}</span>}</span>
                    </div>
                    
                    <label>Price</label>
                    <br />
                    <input
                        type='number'
                        onChange={((e) => { handlePriceChange(e.target.value) })}
                        value={price}
                    />
                    <div className='validator'>
                        <span>{(validator.price == '') && <span>{`* Required, must be u number !!`}</span>}</span>
                    </div>
                    <br />
                    <label>Description</label>
                    <textarea
                        type='text'
                        onChange={((e) => { handleDescriptionChange(e.target.value) })}
                        value={description}
                    >
                        {description}
                    </textarea>
                    <div className='validator'>
                        <span>{(validator.description  == '') && <span>{`* Required`}</span>}</span>
                    </div>
                    


                    <button
                        className='submit-button'
                        type='submit' disabled=
                        {
                            (
                                validator.description === false ||
                                validator.location === false ||
                                validator.date === false ||
                                validator.price === false
                                ? true : false
                            )
                        }
                        style={{
                            opacity:
                                (
                                    validator.description === false ||
                                    validator.location === false ||
                                    validator.date === false ||
                                    validator.price === false
                                    ? '0.1' : '1'
                                )

                        }}

                    >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default MaintenanceUpdate