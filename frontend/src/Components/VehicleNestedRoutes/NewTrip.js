import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
// import { useVehiclesContext } from '../../hooks/useVehiclesContext'


export const NewTrip = () => {

    const {id} = useParams()

    const [ date, setDate ] = useState('')
    const [ from, setFrom ] = useState('')
    const [ to, setTo ] = useState('')
    const [ units, setUnits] = useState('km')
    const [ start, setStart ] = useState('')
    const [ finish, setFinish ] = useState('')
    const [ error, setError ] = useState(null)
    console.log('params', id)
    // const { dispatch } = useVehiclesContext()
    const { user } = useAuthContext()
    
    const [ validator, setValidator ] = useState({
        from: false,
        to: false,
        date: false,
        start: false,
        finish: false,
        units: true
    })

    const navigate = useNavigate()

    const handleSubmit = async(e)=> {
        e.preventDefault()
        console.log(validator)
        if(
            validator.from=== false ||
            validator.to=== false ||
            validator.date=== false ||
            validator.start=== false ||
            validator.finish === false

        ){ return }

        const trip = {vehicle_id: id,from, to, date, start, finish}
           
        const response = await fetch('/api/trip/create', {
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
            setDate('')
            setFrom('')
            setTo('')
            setStart('')
            setFinish('')
            setError('New trip was added')
            setTimeout(() => {
                setError('')
            }, 2000);
            
            // dispatch({type: 'CREATE_TRIP', payload: json})

            // navigate(`/vehicle/${id}/trips/all`)
            
            
          }
       
        

    }

    const handleDateChange = (value) => {
       setDate(value)
       setValidator(prev => ({...prev, date:true}))
    //    if(value.length  > 0){
    //     setValidator(prev => ({...prev, make:true}))
    //    }else{
    //     setValidator(prev => ({...prev, make:false}))
    //    }
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
                <br/>
                <input 
                    type='date'
                    onChange={((e)=> {handleDateChange(e.target.value)})}
                    value={date}
                />
                <div className='validator'>
                    <span>{(!validator.date ) && <span>{`* Required`}</span>}</span>
                </div>
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
                
                
                <button className='submit-button' type='submit' disabled=
                { 
                    (validator.from=== false ||
                    validator.to=== false ||
                    validator.units=== false ||
                    validator.start=== false ||
                    validator.finish === false) ? true : false
                }
                >Submit</button>
            </form>
        </div>
    </div>
  )
}
