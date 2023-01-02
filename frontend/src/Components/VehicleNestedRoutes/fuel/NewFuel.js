import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Loader from '../../Loader/Loader'

const NewFuel = () => {

    const { id } = useParams()


    const [date, setDate] = useState('')
    const [amount, setAmount] = useState(0)
    const [price, setPrice] = useState(0)
    const [location, setLocation] = useState('')
    const [units, setUnits] = useState('liters')
    const [error, setError] = useState(null)
    const [ isLoading, setIsLoading ] = useState(false)
    const { user } = useAuthContext()

    const [validator, setValidator] = useState({
        date: false,
        amount: false,
        location: false,
        price: false,
        units: true,

    })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            validator.date === false ||
            validator.amount === false ||
            validator.price === false ||
            validator.location === false ||
            validator.units === false
        ) {
            return
        }

        const fuel = { vehicle_id: id, date, amount, price, location, units }
        
        setIsLoading(true)
        const response = await fetch('/api/fuel/create', {
            method: 'POST',
            body: JSON.stringify(fuel),
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
            setLocation('')
            setDate('')
            setAmount('')
            setPrice('')
            setError('New fuel record was added')
            setIsLoading(false)
            setValidator(prev => ({...prev, location: false, date: false, amount: false, price: false}) )
            setTimeout(() => {
                setError('')
            }, 2000)
        }

    }

    const handleDateChange = (value) => {
        setDate(value)
        setValidator(prev=> ({...prev, date: true}))
    }

    const handleLocationChange = (value) => {
        setLocation(value)
        if (value) {
            setValidator(prev => ({ ...prev, location: true }))
        } else {
            setValidator(prev => ({ ...prev, location: false }))
        }
    }

    const handleAmountChange = (value) => {
        setAmount(value)

        if(value && !isNaN(value)){
         setValidator(prev => ({...prev, amount:true}))
        }
        if(value && isNaN(value)){
        setValidator(prev => ({...prev, amount:false}))
        }
        if(!value){
            setValidator(prev => ({...prev, amount:false}))
        }

    }
    const handlePriceChange = (value) => {
        setPrice(value)

        if(value && !isNaN(value)){
         setValidator(prev => ({...prev, price:true}))
        }
        if(value && isNaN(value)){
        setValidator(prev => ({...prev, price:false}))
        }
        if(!value){
            setValidator(prev => ({...prev, price:false}))
        }

    }

    const handleUnitsChange = (value) => {
        setUnits(value)
        setValidator(prev => ({ ...prev, units: true }))
    }

    return (
        <div>
            { isLoading ? (
                <Loader/>
            ):(
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
                        <span>{(!validator.date ) && <span>{`* Required`}</span>}</span>
                    </div>
                    <label>Location</label>
                    <br />
                    <input
                        type='text'
                        onChange={((e) => { handleLocationChange(e.target.value) })}
                        value={location}
                    />
                    <div className='validator'>
                        <span>{(!validator.location ) && <span>{`* Required`}</span>}</span>
                    </div>
                    <label>Amount</label>
                    <br />
                    <input
                        type='number'
                        onChange={((e) => { handleAmountChange(e.target.value) })}
                        value={amount}
                    />
                    <div className='validator'>
                        <span>{(!validator.amount) && <span>{`* Required`}</span>}</span>
                    </div>
                    <label>Price</label>
                    <br />
                    <input
                        type='number'
                        onChange={((e) => { handlePriceChange(e.target.value) })}
                        value={price}
                    />
                    <div className='validator'>
                        <span>{(!validator.price) && <span>{`* Required`}</span>}</span>
                    </div>
                    <label>Units</label>
                    <br />
                    <div className='input-wrapper'>
                        <select style={{ width: '200px' }} onChange={(e) => handleUnitsChange(e.target.value)} value={units}>

                            <option>Liters</option>
                            <option>Gallons</option>

                        </select>
                    </div>

                    

                    <button 
                        className='submit-button' 
                        type='submit' disabled=
                            {
                                (
                                    validator.amount === false ||
                                    validator.location === false ||
                                    validator.date === false  ||
                                    validator.price === false
                                    ? true : false
                                )
                            }
                        style={{ opacity: 
                                (
                                    validator.amount === false ||
                                    validator.location === false ||
                                    validator.date === false ||
                                    validator.price === false
                                    ? '0.1' : '1'
                                )
                            
                        }}

                    >Submit</button>
                </form>
            </div>
            )}
            
        </div>
    )

}

export default NewFuel