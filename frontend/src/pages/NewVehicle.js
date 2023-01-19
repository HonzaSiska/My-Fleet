import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useVehiclesContext } from '../hooks/useVehiclesContext'
import { useNavigate } from 'react-router-dom'

import './Auth/Auth.css'

function NewVehicle() {

    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [price, setPrice] = useState('')
    const [purchaseMilage, setPurchaseMilage] = useState('')
    const [error, setError] = useState(null)
    const [salesPrice, setSalesPrice] = useState(undefined)
    const [saleMilage, setSalesMilage] = useState()
    const [units, setUnits] = useState('km')
    const [volume, setVolume] = useState('liters')

    const { dispatch } = useVehiclesContext()
    const { user } = useAuthContext()
    const { distanceUnits, volumeUnits, dispatch: updateState } = useVehiclesContext()

    const [validator, setValidator] = useState({
        make: false,
        model: false,
        year: false,
        purchaseMilage: false,
        price: false,
        salesPrice: true,
        units: true,
        volume: true,
    })

    const navigate = useNavigate();

    const YEARS = []

    for (let i = 2022; i > 1899; i--) {
        YEARS.push(i)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(validator)
        
        if (
            validator.make === false ||
            validator.model === false ||
            validator.year === false ||
            validator.purchaseMilage === false ||
            validator.price === false

        ) { return }

        const newVehicle = { make, model, year, purchaseMilage, price,  salesPrice, units, volume }
        console.log('newVehicle', newVehicle)
        const response = await fetch('/api/vehicle/create', {
            method: 'POST',
            body: JSON.stringify(newVehicle),
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
            setMake('')
            setModel('')
            setYear('')
            setPrice('')
            setYear('')
            setVolume('')
            setPurchaseMilage('')
            setError('')

            // dispatch({ type: 'CREATE_VEHICLE', payload: json })

            navigate('/')

        }



    }

    const handleMakeChange = (value) => {
        setMake(value)

        if (value.length > 0) {
            setValidator(prev => ({ ...prev, make: true }))
        } else {
            setValidator(prev => ({ ...prev, make: false }))
        }
    }
    const handleModelChange = (value) => {
        setModel(value)

        if (value.length > 0) {
            setValidator(prev => ({ ...prev, model: true }))
        } else {
            setValidator(prev => ({ ...prev, model: false }))
        }
    }

    const handleYearChange = (value) => {
        setYear(value)

        if (value && !isNaN(value)) {
            setValidator(prev => ({ ...prev, year: true }))
        } else {
            setValidator(prev => ({ ...prev, year: false }))
        }
    }
    const handlePriceChange = (value) => {
        setPrice(value)

        if (value && !isNaN(value)) {
            setValidator(prev => ({ ...prev, price: true }))
        } else {
            setValidator(prev => ({ ...prev, price: false }))
        }
    }
    const handleSalesPriceChange = (value) => {
        setSalesPrice(value)

        if (value && isNaN(value)) {
            setValidator(prev => ({ ...prev, salePrice: false }))
        } else {
            setValidator(prev => ({ ...prev, salePrice: true }))
        }
    }
    const handlePurchaseMilageChange = (value) => {
        setPurchaseMilage(value)

        if (value && !isNaN(value)) {
            setValidator(prev => ({ ...prev, purchaseMilage: true }))
        } else {
            setValidator(prev => ({ ...prev, purchaseMilage: false }))
        }
    }
    const handleUnitsChange = (value) => {
        setUnits(value)
        setValidator(prev => ({ ...prev, units: true }))
    }

    const handleVolumeChange = (value) => {
        setVolume(value)
        setValidator(prev => ({ ...prev, volume: true }))
    }



    return (
        <div>
            <div className='title'>
                <h2>New Vehicle</h2>
            </div>
            <div className='form-wrapper'>
                <form onSubmit={handleSubmit} className='form-content'>
                    {error &&
                        (
                            <div className='error'>
                                <span>{error}</span>
                            </div>
                        )
                    }
                    <label>Make</label>
                    <br />
                    <input
                        type='text'
                        onChange={((e) => { handleMakeChange(e.target.value) })}
                        value={make}
                    />
                    <div className='validator'>
                        <span>{(!validator.make) && <span>{`* Required`}</span>}</span>
                    </div>


                    <label>Model</label>
                    <br />
                    <div className='input-wrapper'>
                        <input
                            type='text'
                            onChange={((e) => { handleModelChange(e.target.value) })}
                            value={model}
                        />
                    </div>
                    <div className='validator'>
                        <span>{(!validator.model) && <span>{`* Required`}</span>}</span>
                    </div>
                    <label>Year</label>
                    <br />
                    <div className='input-wrapper'>
                        <select style={{ width: '200px' }} onChange={(e) => handleYearChange(e.target.value)} >
                            <option>-- Select Year --</option>
                            {
                                YEARS.map((y) => (
                                    <option key={y} style={{ color: 'black' }}>{y}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='validator'>
                        <span>{(!validator.year) && <span>{`* Select Year`}</span>}</span>
                    </div>
                    <label>Purchase Milage</label>
                    <br />
                    <div className='input-wrapper'>
                        <input
                            type='text'
                            onChange={((e) => { handlePurchaseMilageChange(e.target.value) })}
                            value={purchaseMilage}
                        />
                    </div>
                    <div className='validator'>
                        <span>{(!validator.purchaseMilage) && <span>{`* Required, must be a number`}</span>}</span>
                    </div>



                    <label>Purchase Price</label>
                    <br />
                    <div className='input-wrapper'>
                        <input
                            type='text'
                            onChange={((e) => { handlePriceChange(e.target.value) })}
                            value={price}
                        />
                    </div>
                    <div className='validator'>
                        <span>{(!validator.price) && <span>{`* Required, must be a number`}</span>}</span>
                    </div>

                    <label>Sale Price</label>
                    <br />
                    <div className='input-wrapper'>
                        <input
                            type='text'
                            onChange={((e) => { handleSalesPriceChange(e.target.value) })}
                            value={salesPrice || ''}
                        />
                    </div>
                    <div className='validator'>
                        <span>{(!validator.salesPrice) && <span>{`* Not required, must be a number`}</span>}</span>
                    </div>

                    <div >
                        <label>Units (distance)</label>
                        <br />
                        <div className='input-wrapper'>
                            <select style={{ width: '200px' }} onChange={(e) => handleUnitsChange(e.target.value)} value={units}>

                                <option>km</option>
                                <option>miles</option>

                            </select>
                        </div>
                    </div>

                    <div >
                        <label>Units (volume)</label>
                        <br />
                        <div className='input-wrapper'>
                            <select style={{ width: '200px' }} onChange={(e) => handleVolumeChange(e.target.value)} value={volume}>
                                {/* { !volume && <option>-- select volume --</option>} */}
                                <option>liters</option>
                                <option>gallons</option>

                            </select>
                        </div>
                    </div>


                    <button className='submit-button' type='submit' disabled=
                        {
                            (validator.make === false ||
                                validator.model === false ||
                                validator.year === false ||
                                validator.purchaseMilage === false ||
                                validator.price === false) ? true : false
                        }
                    >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default NewVehicle