import React, { useState } from 'react'
import './Auth.css'
import { isEmail } from '../../utils/regex.js'


function Reset() {

    const [ email, setEmail ] = useState('')
    const [ error, setError ] = useState('')
    const [ validator, setValidator ] = useState({
        email: false
    })
 
    


    const handleSubmit = async(e)=> {
        e.preventDefault()
        if(validator.email=== false) return
        
        const response = await fetch('/api/user/forgot-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: email })
          })
          const json = await response.json()
          console.log('email', json.message)
          setError('Reset-password link  has been sent to your email')
          setEmail('')
        
    }

    const handleEmailChange = (value) => {
       setEmail(value)

       if(isEmail(value)){
        setValidator(prev => ({...prev, email:true}))
       }else{
        setValidator(prev => ({...prev, email:false}))
       }
   
    }
    

  return (
    <div>
        <div className='title'>
            <h2>Enter Your Email</h2>
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
                <label>Email</label>
                <br/>
                <input 
                    type='text'
                    onChange={((e)=> {handleEmailChange(e.target.value)})}
                    value={email}
                />
                <div className='validator'>
                    <span>{(!validator.email ) && <span>{`* Valid email format (example@email.com)`}</span>}</span>
                </div>
                
                <button className='submit-button' type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Reset