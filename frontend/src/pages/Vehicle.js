
import { useState, useEffect } from 'react'
import { useVehiclesContext } from '../hooks/useVehiclesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link, Outlet, useNavigate, useParams } from "react-router-dom"
import './Vehicle.css'

//assets
import EditIcon from '../assets/edit.svg'
import CloseIcon from '../assets/close-icon-dark.svg'



const Vehicle = () => {

    const [vehicle, setVehicle] = useState({})
    const { id } = useParams();
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [price, setPrice] = useState('')
    const [purchaseMilage, setPurchaseMilage] = useState('')
    const [error, setError] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const { dispatch } = useVehiclesContext()
    const { user } = useAuthContext()

    const [validator, setValidator] = useState({
        make: false,
        model: false,
        year: false,
        purchaseMilage: false,
        price: false,
    })

    // const navigate = useNavigate();

    const YEARS = []

    for (let i = 2022; i > 1899; i--) {
        YEARS.push(i)
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
            validator.price === false

        ) { return }

        const updatedVehicle = { make, model, year, purchaseMilage, price }

        console.log('updated veh', updatedVehicle)

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
            setPurchaseMilage(json.vehicle.purchaseMilage)
            setError('')
            setIsEdit(false)

            //set all validfators to true to et rid of validation messages
            for (let key in validator) {
                validator[key] = true
            }


            dispatch({ type: 'UPDATE_VEHICLE', payload: json.vehicle })

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
    const handlePurchaseMilageChange = (value) => {
        setPurchaseMilage(value)

        if (value && !isNaN(value)) {
            setValidator(prev => ({ ...prev, purchaseMilage: true }))
        } else {
            setValidator(prev => ({ ...prev, purchaseMilage: false }))
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
                setPurchaseMilage(json.vehicle.purchaseMilage)
                setError('')
                //set all validfators to true to et rid of validation messages
                for (let key in validator) {
                    validator[key] = true
                }

                console.log('valid', validator)
            }
        }

        if (user) {
            fetchVehicle()
        }

    }, [user])


    return (
        <div>
            <div className='title'>
                <h2>{`${make} ${model} ${year}`}</h2>
                {!isEdit && (
                    <img onClick={() => setIsEdit(true)} className='edit-icon' src={EditIcon} alt='edit-icon' />
                )}
                {isEdit && (
                    <img onClick={() => setIsEdit(false)} className='close-edit-icon' src={CloseIcon} alt='close-icon' />
                )}

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
                            <>
                                <label>Price</label>
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


                                <button className='submit-button' type='submit' disabled=
                                    {
                                        (validator.make === false ||
                                            validator.model === false ||
                                            validator.year === false ||
                                            validator.purchaseMilage === false ||
                                            validator.price === false) ? true : false
                                    }
                                >Submit</button>
                            </>
                        )
                    }


                    {
                        !isEdit && (
                            <div>
                                <div>
                                    <span>Make: <span>{make}</span> </span>
                                </div>
                                <div>
                                    <span>Model: <span>{model}</span> </span>
                                </div>
                                <div>
                                    <span>Year: <span>{year}</span> </span>
                                </div>
                                <div>
                                    <span>Purchase Milage: <span>{purchaseMilage}</span> </span>
                                </div>
                                <div>
                                    <span>Price: <span>{price}</span> </span>
                                </div>
                            </div>
                        )
                    }
                </form>

                <nav className='nested-routes-wrapper'>
                    <Link className='sub-link nested-menu-active' to='trips/all' onClick={handleIsActive}>Trips</Link>
                    <Link className='sub-link' to='fuel' onClick={handleIsActive}>Fuel</Link>
                    <Link className='sub-link' to='Maintenance' onClick={handleIsActive}>Maintenance</Link>
                </nav>

                <div className='outlet'>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default Vehicle