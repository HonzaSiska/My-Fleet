import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import Loader from '../Loader/Loader'
// import { useVehiclesContext } from '../../hooks/useVehiclesContext'


export const NewTrip = () => {

    const { id } = useParams()

    const [departure, setDeparture] = useState('')
    const [arrival, setArrival] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [start, setStart] = useState('')
    const [finish, setFinish] = useState('')
    const [error, setError] = useState(null)
    const [isChecked, setIsChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuthContext()

    const [validator, setValidator] = useState({
        from: false,
        to: false,
        departure: false,
        arrival: false,
        start: false,
        finish: true,

    })



    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            isChecked && (
                validator.from === false ||
                validator.to === false ||
                validator.departure === false ||
                validator.arrival === false ||
                validator.start === false ||
                validator.finish === false
            )
        ) {
            setError('Fill out all fields to mark as complete')
            setTimeout(() => {
                setError('')
            }, 2000)
            return
        }

        if (
            validator.from === false ||
            validator.to === false
        ) { return }

        const trip = { vehicle_id: id, from, to, departure, arrival, start, finish, completed: isChecked }

        setIsLoading(true)
        const response = await fetch('/api/trip/create', {
            method: 'POST',
            body: JSON.stringify(trip),
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
            setDeparture('')
            setArrival('')
            setFrom('')
            setTo('')
            setStart('')
            setFinish('')
            setIsChecked(false)
            setError('New trip was added')
            setIsLoading(false)
            setTimeout(() => {
                setError('')
            }, 2000);


        }



    }

    const handleDepartureChange = (value) => {
        setDeparture(value)
        setValidator(prev => ({ ...prev, departure: true }))
           if(value.length  > 0){
            setValidator(prev => ({...prev, departure:true}))
           }else{
            setValidator(prev => ({...prev, departure:false}))
           }
    }
    const handleArrivalChange = (value) => {
        setArrival(value)
        setValidator(prev => ({ ...prev, arrival: true }))

    }
    const handleFromChange = (value) => {
        setFrom(value)

        if (value) {
            setValidator(prev => ({ ...prev, from: true }))
        } else {
            setValidator(prev => ({ ...prev, from: false }))
        }
    }

    const handleToChange = (value) => {
        setTo(value)

        if (value) {
            setValidator(prev => ({ ...prev, to: true }))
        } else {
            setValidator(prev => ({ ...prev, to: false }))
        }

    }
  
    const handleStartChange = (value) => {
        setStart(value)

        if (value && !isNaN(value)) {
            setValidator(prev => ({ ...prev, start: true }))
        } if (value && isNaN(value)) {
            setValidator(prev => ({ ...prev, start: false }))
        }
        if (!value) {
            setValidator(prev => ({ ...prev, start: false }))
        }
    }
    const handleFinishChange = (value) => {
        setFinish(value)

        if (value && !isNaN(value)) {
            setValidator(prev => ({ ...prev, finish: true }))
        } if (value && isNaN(value)) {
            setValidator(prev => ({ ...prev, finish: false }))
        }
        if (!value) {
            setValidator(prev => ({ ...prev, finish: false }))
        }
    }

    return (
        <div>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className='form-wrapper'>
                        <form onSubmit={handleSubmit} className='form-content'>
                            {error &&
                                (
                                    <div className='error'>
                                        <span>{error}</span>
                                    </div>
                                )
                            }
                            <label>Departure Time & Date</label>
                            <br />
                            <input
                                type='datetime-local'
                                onChange={((e) => { handleDepartureChange(e.target.value) })}
                                value={departure}
                            />
                            <label>Arrival Time & Date</label>
                            <br />
                            <input
                                type='datetime-local'
                                onChange={((e) => { handleArrivalChange(e.target.value) })}
                                value={arrival}
                            />
                            <label>From</label>
                            <br />
                            <input
                                type='text'
                                onChange={((e) => { handleFromChange(e.target.value) })}
                                value={from}
                            />
                            <div className='validator'>
                                <span>{(!validator.from) && <span>{`* Required`}</span>}</span>
                            </div>
                            <label>To</label>
                            <br />
                            <div className='input-wrapper'>
                                <input
                                    type='text'
                                    onChange={((e) => { handleToChange(e.target.value) })}
                                    value={to}
                                />
                            </div>
                            <div className='validator'>
                                <span>{(!validator.to) && <span>{`* Required`}</span>}</span>
                            </div>
                            {/* <label>Units</label>
                            <br />
                            <div className='input-wrapper'>
                                <select style={{ width: '200px' }} onChange={(e) => handleUnitsChange(e.target.value)} value={units}>

                                    <option>km</option>
                                    <option>miles</option>

                                </select>
                            </div> */}

                            <label>Odometer Start</label>
                            <br />
                            <div className='input-wrapper'>
                                <input
                                    type='text'
                                    onChange={((e) => { handleStartChange(e.target.value) })}
                                    value={start}
                                />
                            </div>
                            <div className='validator'>
                                <span>{(!validator.start) && <span>{`* Required, must be a number`}</span>}</span>
                            </div>
                            <label>Odometer Finish</label>
                            <br />
                            <div className='input-wrapper'>
                                <input
                                    type='text'
                                    onChange={((e) => { handleFinishChange(e.target.value) })}
                                    value={finish}
                                />
                            </div>
                            <div className='validator'>
                                <span>{(!validator.finish) && <span>{`* Required, must be a number`}</span>}</span>
                            </div>
                            <div className='input-wrapper checkbox-wrapper'>
                                <label style={{ fontSize: "11px", color: isChecked ? 'green' : 'red' }}>{isChecked ? 'Completed' : 'Mark as completed'}</label>
                                <input type='checkbox' className='checkbox' onChange={() => setIsChecked(!isChecked)} value={isChecked} />


                            </div>

                            <button
                                className='submit-button'
                                type='submit' disabled=
                                {
                                    (
                                        validator.from === false ||
                                        validator.to === false ? true : false
                                    )
                                }
                                style={{
                                    opacity:
                                        (
                                            validator.from === false ||
                                            validator.to === false
                                            ? '0.1' : '1'
                                        )

                                }}
                            >Submit</button>
                        </form>
                    </div>
                )
            }

        </div>
    )
}
