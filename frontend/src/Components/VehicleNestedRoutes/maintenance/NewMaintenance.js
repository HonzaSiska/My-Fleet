import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Loader from '../../Loader/Loader'

const NewMaintenance = () => {

    const { id } = useParams()


    const [ date, setDate ] = useState('')
    const [ price, setPrice ] = useState(0)
    const [ location, setLocation ] = useState('')
    const [ description, setDescription ] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuthContext()

    const [validator, setValidator] = useState({
        date: false,
        price: false,
        location: false,
        description: false,
    })
    const navigate = useNavigate()

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

    const handleDescriptionChange = (value) => {
        setDescription(value)
        if(!value){
            setValidator(prev => ({...prev, description:false}))
        }else{
            setValidator(prev => ({ ...prev, description: true }))
        }
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (
            validator.date === false ||
            validator.description === false ||
            validator.price === false ||
            validator.location === false 
          
        ) {
            return
        }

        const maintenance = { vehicle_id: id, date, price, location, description }
        
        setIsLoading(true)
        const response = await fetch('/api/maintenance/create', {
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
            setLocation('')
            setDate('')
            setPrice('')
            setDescription('')
            setError('New maintenance record was added')
            setIsLoading(false)
            setValidator(prev => ({...prev, location: false, date: false, description: false, price: false}) )
            setTimeout(() => {
                setError('')
            }, 2000)
        }
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
                    <label>Description</label>
                    <br />
                    <div className='input-wrapper'>
                        <textarea
                            onChange={(e) => handleDescriptionChange(e.target.value)} 
                            value={description}
                        >
                        
                        </textarea>   
                    </div>
                    <div className='validator'>
                        <span>{(!validator.description ) && <span>{`* Required`}</span>}</span>
                    </div> 

                    

                    <button 
                        className='submit-button' 
                        type='submit' disabled=
                            {
                                (
                                    validator.description === false ||
                                    validator.location === false ||
                                    validator.date === false  ||
                                    validator.price === false
                                    ? true : false
                                )
                            }
                        style={{ opacity: 
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
            )}
            
        </div>
    )
}

export default NewMaintenance