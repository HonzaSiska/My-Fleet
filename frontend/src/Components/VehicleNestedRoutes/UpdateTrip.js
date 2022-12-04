import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { formatDateTime } from '../../utils/utils'

// import { useVehiclesContext } from '../../hooks/useVehiclesContext'


export const UpdateTrip = () => {

    const {tripId} = useParams()
    const {id} = useParams()

    const [ departure, setDeparture ] = useState('')
    const [ arrival, setArrival ] = useState('')
    const [ from, setFrom ] = useState('')
    const [ to, setTo ] = useState('')
    const [ units, setUnits] = useState('')
    const [ start, setStart ] = useState(0)
    const [ finish, setFinish ] = useState(0)
    const [ error, setError ] = useState(null)
    const [ completed, setCompleted ] = useState(false)
    const [ isChecked, setIsChecked ] = useState(false)

    const { user } = useAuthContext()
    
    const [ validator, setValidator ] = useState({
        from: false,
        to: false,
        departure: false,
        arrival: false,
        start: false,
        finish: false,
        units: true
    })

    const navigate = useNavigate()

    //  remove tab highlights
    const links = document.querySelectorAll('.tab')
    links.forEach(link=> {
        console.log(link)
        link.classList.remove('tab-active')
        
    })

    
    useEffect(() => {


        const fetchTrip = async () => {
            const response = await fetch(`/api/trip/${tripId}`, {
                headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
                method: 'POST',
            })

            const json = await response.json()

            if (json.success) {

                const {trip} = json
                
                console.log('received trip', trip)

                // convert to date 
                const newDeparture = new Date(trip.departure)
                const newArrival = new Date(trip.arrival)

                trip.departure && setDeparture(formatDateTime(newDeparture))
                trip.arrival && setArrival(formatDateTime(newArrival))
                trip.from && setFrom(trip.from)
                trip.to && setTo(trip.to)
                trip.units && setUnits(trip.units)
                trip.start && setStart(trip.start)
                trip.finish && setFinish(trip.finish)
                setIsChecked(trip.completed)
                setError('')

               
                //set all validfators to true to et rid of validation messages
                // for (let key in validator) {
                //     console.log([key])
                //     validator[key] = true
                // }
                trip.departure && setValidator(validator.departure = true)
                trip.arrival && setValidator(validator.arrival = true)
                trip.from && setValidator(validator.from = true)
                trip.to && setValidator(validator.to = true)
                trip.units && setValidator(validator.units = true)
                trip.start && setValidator(validator.start = true)
                trip.finish && setValidator(validator.finish = true)
                trip.completed && setValidator(validator.completed = true)

                console.log('validator after fetch', validator)
               

            }
        }

        if (user) {
            fetchTrip()
        }

    }, [user])

    const handleSubmit = async(e)=> {
        e.preventDefault()
        console.log(validator)

        if( 
            isChecked && (
                validator.from === false ||
                validator.to === false ||
                validator.departure === false ||
                validator.arrival === false ||
                validator.start=== false ||
                validator.finish === false
            )
        ){
            setError('Fill out all fields to mark as complete')
            setTimeout(()=>{
                setError('')
            }, 2000)
            return
        }
        if(
            validator.from=== false ||
            validator.to=== false ||
            validator.date=== false ||
            validator.start=== false ||
            validator.finish === false

        ){ return }

        const trip = {_id: tripId,from, to, departure, arrival, start, finish, completed: isChecked}
           
        const response = await fetch('/api/trip/update', {
            method: 'POST',
            body: JSON.stringify(trip),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
        })
        
         const json = await response.json()
         console.log('rsesponse',json)

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

            navigate(`/vehicle/${id}/trips/all`)
          }
       
        

    }

    const handleDepartureChange = (value) => {
        setDeparture(value)
        setValidator(prev => ({...prev, departure:true}))
     }
     const handleArrivalChange = (value) => {
         setArrival(value)
         setValidator(prev => ({...prev, arrival:true}))
      
      }
    const handleFromChange = (value) => {
        setFrom(value)
 
        if(value){
            setValidator(prev => ({...prev, from:true}))
           }else{
            setValidator(prev => ({...prev, from:false}))
           }
    }

    const handleToChange = (value) => {
        setTo(value)
 
        if(value){
            setValidator(prev => ({...prev, to:true}))
           }else{
            setValidator(prev => ({...prev, to:false}))
           }
    }
    
    const handleUnitsChange = (value) => {
        setUnits(value)
        setValidator(prev => ({...prev, units:true}))
    }

    const handleStartChange = (value) => {
        setStart(value)
 
        if(value && !isNaN(value)){
         setValidator(prev => ({...prev, start:true}))
        }else{
         setValidator(prev => ({...prev, start:false}))
        }
    }

    const handleFinishChange = (value) => {
        setFinish(value)
 
        if(value && !isNaN(value)){
         setValidator(prev => ({...prev, finish:true}))
        }else{
         setValidator(prev => ({...prev, finish:false}))
        }
    }
     
  return (
    <div>
        <h3 className='title'>{from} - {to}</h3>
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
                <br/>
                <input 
                    type='datetime-local'
                    onChange={((e)=> {handleDepartureChange(e.target.value)})}
                    value={departure}
                />
                {/* <div className='validator'>
                    <span>{(!validator.departure ) && <span>{`* Required`}</span>}</span>
                </div> */}
                <label>Arrival Time & Date</label>
                <br/>
                <input 
                    type='datetime-local'
                    onChange={((e)=> {handleArrivalChange(e.target.value)})}
                    value={arrival}
                />
                {/* <div className='validator'>
                    <span>{(!validator.date ) && <span>{`* Required`}</span>}</span>
                </div> */}
                <label>From</label>
                <br/>
                <input 
                    type='text'
                    onChange={((e)=> {handleFromChange(e.target.value)})}
                    value={from}
                />
                <div className='validator'>
                    <span>{(!validator.from ) && <span>{`* Required`}</span>}</span>
                </div>
                
                
                <label>To</label>
                <br/>
                <div className='input-wrapper'>
                    <input 
                        type='text' 
                        onChange={((e)=> {handleToChange(e.target.value)})}
                        value={to}
                    />
                </div>
                <div className='validator'>
                    <span>{(!validator.to ) && <span>{`* Required`}</span>}</span>
                </div>
                <label>Units</label>
                <br/>
                <div className='input-wrapper'>
                    <select style={{width:'200px'}} onChange={(e)=>handleUnitsChange(e.target.value)} value={units}>
                        
                        <option>km</option>
                        <option>miles</option>
                        
                    </select>
                </div>
                
                <label>Odometer Start</label>
                <br/>
                <div className='input-wrapper'>
                    <input 
                        type='text' 
                        onChange={((e)=> {handleStartChange(e.target.value)})}
                        value={start}
                    />
                </div>
                <div className='validator'>
                    <span>{(!validator.start ) && <span>{`* Required, must be a number`}</span>}</span>
                </div>
                <label>Odometer Finish</label>
                <br/>
                <div className='input-wrapper'>
                    <input 
                        type='text' 
                        onChange={((e)=> {handleFinishChange(e.target.value)})}
                        value={finish}
                    />
                </div>
                <div className='validator'>
                    <span>{(!validator.finish) && <span>{`* Required, must be a number`}</span>}</span>
                </div>
                
                <div className='input-wrapper checkbox-wrapper'>
                    <label style={{fontSize:"11px" ,color: isChecked ? 'green' : 'red'}}>{isChecked ? 'Completed': 'Mark as completed'}</label>
                    <input type='checkbox' className='checkbox' onChange={()=> setIsChecked(!isChecked)} value={isChecked}/>
                    
                    
                </div>
                <button className='submit-button' type='submit' disabled=
                { 
                    (validator.from=== false ||
                    validator.to=== false  ? true : false
                    )
                }
                >Submit</button>
            </form>
        </div>
    </div>
  )
}
