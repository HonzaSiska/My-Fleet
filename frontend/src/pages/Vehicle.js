
import { useState, useEffect } from 'react'
import { useVehiclesContext } from '../hooks/useVehiclesContext'
import { useAuthContext } from '../hooks/useAuthContext'

import { Link, Outlet, useNavigate, useParams } from "react-router-dom"

import './Vehicle.css'

//assets
import EditIcon from '../assets/edit.svg'
import CloseIcon from '../assets/close-icon-dark.svg'
import Modal from '../Components/modal/Modal'
import Loader from '../Components/Loader/Loader'



const Vehicle = () => {

    const [vehicle, setVehicle] = useState({})
    const { id } = useParams();
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [salesPrice, setSalesPrice] = useState(undefined)
    const [saleMilage, setSalesMilage ] = useState()
    const [price, setPrice] = useState()
    const [purchaseMilage, setPurchaseMilage] = useState()
    const [units, setUnits] = useState('km')
    const [volume, setVolume] = useState('liters')
    const [error, setError] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [toBeDeleted, setToBeDeleted] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // const { dispatch, vehicles, car} = useVehiclesContext()
    const { user } = useAuthContext()
    const { distanceUnits, volumeUnits, dispatch } = useVehiclesContext()
    const navigate = useNavigate()
    
    const [validator, setValidator] = useState({
        make: false,
        model: false,
        year: false,
        purchaseMilage: false,
        price: false,
        salesPrice: true,
        units: true,
        volume:true,
    })

    // const navigate = useNavigate();

    const YEARS = []

    for (let i = 2022; i > 1899; i--) {
        YEARS.push(i)
    }

    const openModal = (e, _trip_id) => {
        e.preventDefault()
        setModalIsOpen(!modalIsOpen)
        setToBeDeleted(id)

    }

    const handleIsActive = (e) => {
        const links = document.querySelectorAll('.sub-link')
        links.forEach(link => {
            console.log(link)
            link.classList.remove('nested-menu-active')

        })
        e.target.classList.add('nested-menu-active')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(validator)
        if (
            validator.make === false ||
            validator.model === false ||
            validator.year === false ||
            validator.purchaseMilage === false ||
            validator.price === false||
            validator.salesPrice === false 


        ) { return }

        const updatedVehicle = { make, model, year, purchaseMilage, saleMilage, price,  salesPrice, units, volume }

        console.log('updated veh', updatedVehicle)

        setIsLoading(true)

        const response = await fetch(`/api/vehicle/update/${id}`, {
            method: 'POST',
            body: JSON.stringify(updatedVehicle),
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
            setVehicle(json.vehicle)
            setMake(json.vehicle.make)
            setModel(json.vehicle.model)
            setYear(json.vehicle.year)
            setPrice(json.vehicle.price)
            setSalesPrice(json.vehicle.salesPrice)
            setYear(json.vehicle.year)
            setVolume(json.vehicle.volume)
            setPurchaseMilage(json.vehicle.purchaseMilage)
            setError('')
            setIsEdit(false)
            setIsLoading(false)

            


            //set all validfators to true to get rid of validation messages
            for (let key in validator) {
                validator[key] = true
            }

            dispatch({type: 'SET_DISTANCE_UNITS', payload: json.vehicle.units})
            dispatch({type: 'SET_VOLUME_UNITS', payload: json.vehicle.volume})
           

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

    const handleDelete = (vehicleId) => {
        const deleteTrip = async () => {
            const response = await fetch(`/api/vehicle/delete/${vehicleId}`, {
                headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
                method: 'POST',
            })
            const json = await response.json()
            if (json.success) {
                setModalIsOpen(!modalIsOpen)
                navigate(`/`)

            } else {
                setError(json.error)
            }

        }

        if (user) {
            deleteTrip()
        }
    }


    useEffect(() => {
        const fetchVehicle = async () => {
            const response = await fetch(`/api/vehicle/${id}`, {
                headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
                method: 'POST',
            })

            const json = await response.json()

            if (json.success) {

                setVehicle(json.vehicle)
                setMake(json.vehicle.make)
                setModel(json.vehicle.model)
                setYear(json.vehicle.year)
                setPrice(json.vehicle.price)
                setSalesPrice(json.vehicle.salesPrice)
                setVolume(json.vehicle.volume)
                setUnits(json.vehicle.units)
                setYear(json.vehicle.year)
                setPurchaseMilage(json.vehicle.purchaseMilage)
                setError('')
                setIsLoading(false)
                //set all validfators to true to et rid of validation messages
                for (let key in validator) {
                    validator[key] = true
                }

                console.log('test', json.vehicle.units)
                dispatch({type: 'SET_DISTANCE_UNITS', payload: json.vehicle.units})
                dispatch({type: 'SET_VOLUME_UNITS', payload: json.vehicle.volume})

                console.log('dist units state', distanceUnits)
            }
        }

        if (user) {
            fetchVehicle()
        }

    }, [distanceUnits])


    return (
        <div>
            <div className='title'>
                <p>{`${make} ${model} ${year}`}</p>
                {!isEdit && (
                    <img onClick={() => setIsEdit(true)} className='edit-icon' src={EditIcon} alt='edit-icon' />
                )}
                {isEdit && (
                    <img onClick={() => setIsEdit(false)} className='close-edit-icon' src={CloseIcon} alt='close-icon' />
                )}

            </div>

            {
                isLoading ? <Loader /> : (

                    <div className='form-wrapper'>
                        <form onSubmit={handleSubmit} className='form-content'>
                            {error &&
                                (
                                    <div className='error'>
                                        <span>{error}</span>
                                    </div>
                                )
                            }


                            {
                                isEdit && (
                                    <>
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
                                    </>
                                )
                            }


                            {
                                isEdit && (
                                    <>
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
                                    </>
                                )
                            }


                            {
                                isEdit && (
                                    <>
                                        <label>Year</label>
                                        <br />
                                        <div className='input-wrapper'>
                                            <select style={{ width: '200px' }} onChange={(e) => handleYearChange(e.target.value)} value={year}>
                                                <option>-- Select Year --</option>
                                                {
                                                    YEARS.map((y) => (
                                                        <option key={y} style={{ color: 'black' }} >{y}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='validator'>
                                            <span>{(!validator.year) && <span>{`* Select Year`}</span>}</span>
                                        </div>
                                    </>
                                )
                            }


                            {
                                isEdit && (
                                    <>
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
                                    </>
                                )
                            }

                            {
                                isEdit && (
                                    <div >
                                        <label>Units (distance)</label>
                                        <br />
                                        {units}
                                        <div className='input-wrapper'>
                                            <select style={{ width: '200px' }} onChange={(e) => handleUnitsChange(e.target.value)} value={units}>

                                                <option>km</option>
                                                <option>miles</option>

                                            </select>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                isEdit && (
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
                                )
                            }

                            {
                                isEdit && (
                                    <>
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


                                        <button className='submit-button' type='submit' disabled=
                                            {
                                                (validator.make === false ||
                                                    validator.model === false ||
                                                    validator.year === false ||
                                                    validator.purchaseMilage === false ||
                                                    validator.price === false ||
                                                    validator.salesPrice === false) ? true : false
                                            }
                                        >Submit</button>
                                    </>
                                )
                            }
                            


                            {

                                !isEdit && (
                                    <div className='vehicle-info-content'>
                                        <div>
                                            <div>
                                                <span>Make: <span className='bold'>{make}</span> </span>
                                            </div>
                                            <div>
                                                <span>Model: <span className='bold'>{model}</span> </span>
                                            </div>
                                            <div>
                                                <span>Year: <span className='bold'>{year}</span> </span>
                                            </div>
                                            <div>
                                                <span>Purchase Milage: <span className='bold'>{purchaseMilage}</span> </span><span>{` ${distanceUnits}`}</span>
                                            </div>
                                            <div>
                                                <span>Price: <span className='bold'>{price}</span> </span>
                                            </div>
                                            <div>
                                                <span>Sale Price: <span className='bold'>{salesPrice}</span> </span>
                                            </div>
                                            <div>
                                                <span>Units (distance): <span className='bold'>{units}</span> </span>
                                            </div>
                                            <div>
                                                <span>Units (volume): <span className='bold'>{volume}</span> </span>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={(e) => openModal(e, id)} className='details-btn'>Delete</button>
                                        </div>
                                    </div>
                                )
                            }

                            
                        </form>

                        <nav className='nested-routes-wrapper'>
                            <Link className='sub-link nested-menu-active' to='trips/all' onClick={handleIsActive}>Trips</Link>
                            <Link className='sub-link' to='fuel/all' onClick={handleIsActive}>Fuel</Link>
                            <Link className='sub-link' to='maintenance/all' onClick={handleIsActive}>Maintenance</Link>
                        </nav>

                        <div className='outlet'>
                            <Outlet />
                        </div>

                    </div>
                )
            }
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
    )
}

export default Vehicle