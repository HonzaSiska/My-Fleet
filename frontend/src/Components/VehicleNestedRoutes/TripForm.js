import React from 'react'

export const TripForm = ({...props}) => {
  const {
    validator, setValidator,
    departure, setDeparture,
    arrival, setArrival,
    from, setFrom,
    to, setTo,
    units,  setUnits,
    start, setStart,
    finish, setFinish,
    error, setError,
    isChecked, setIsChecked
  } = props
  return (
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
                    <label style={{fontSize:"11px",color: isChecked ? 'green' : 'red'}}>{isChecked ? 'Completed': 'Mark as completed'}</label>
                    <input type='checkbox' className='checkbox' onChange={()=> setIsChecked(!isChecked)} value={isChecked}/>
                    
                    
                </div>
                
                <button className='submit-button' type='submit' disabled=
                { 
                    (
                        validator.from=== false ||
                        validator.to=== false ? true : false
                    )
                }
                >Submit</button>
            </form>
  )
}
