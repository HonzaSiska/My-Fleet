import React, { useState } from 'react'
import { useUpdatePassword } from '../../hooks/useUpdatePassword'
import Eye from '../../assets/eye.png'
import './Auth.css'
import { isEmail } from '../../utils/regex.js'
import { useParams } from "react-router-dom";

function ChangePassword() {

    const [ password, setPassword ] = useState('')
    const [ passwordConfirm, setPasswordConfirm ] = useState('')
    const [ passwordVisible, setPasswordVisible ] = useState(false)
    const [ validator, setValidator ] = useState({
        password: false,
       
       
    })
    const {updatePassword, error, isLoading} = useUpdatePassword()

    const  { token } = useParams()
    
    const PASSWORDS_MATCH = password === passwordConfirm

    const handleSubmit = async(e)=> {
        console.log("PASSWORDS_MATCH", PASSWORDS_MATCH)
        console.log(validator)
        e.preventDefault()
        if(validator.email=== false || !PASSWORDS_MATCH
        ) return 

        updatePassword(token, password, passwordConfirm)

        //UPDATE PASSWORDS

        // Create hook update useUpdateCredentials
        // change passowrd, hash it ,updatte in db, send back token, store it in LOcal storage
    }


   

    const handlePasswordChange = (value) => {
        setPassword(value)
         
        const  regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,30}$/;
      
        if( regex.test(value) ) {
         setValidator(prev => ({...prev, password:true}))
         console.log(validator)
         
        }else{
         setValidator(prev => ({...prev, password:false}))
         console.log(validator)
        
        }
        
      
    }
    const handleConfirmPasswordChange = (value) => {

         setPasswordConfirm(value)
         console.log(validator)
   
        
    }

  return (
    <div>
        
        <div className='title'>
          <h2>Password Change</h2>
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
                
               
               
                <label>Password</label>
                <br/>
                <div className='input-wrapper'>
                    <input 
                        type={passwordVisible ? 'text' : 'password'}
                        onChange={((e)=> {handlePasswordChange(e.target.value)})}
                        value={password}
                    />
                    <div onClick={() => setPasswordVisible(!passwordVisible)} className='eye-wrapper'>
                        <img src={Eye}/>
                    </div>
                </div>
                {validator.password !== true && (
                        <div className='validator'>
                            <span>* At least 10 characters, one uppercase, lowercase, special character, digit</span>
                        </div>
                    )
                }
              
                <label>Confirm Password</label>
                <br/>
                <div className='input-wrapper'>
                    <input 
                        type={passwordVisible ? 'text' : 'password'}
                        onChange={((e)=> {handleConfirmPasswordChange(e.target.value)})}
                        value={passwordConfirm}
                    />
                    <div onClick={() => setPasswordVisible(!passwordVisible)} className='eye-wrapper'>
                        <img src={Eye}/>
                    </div>
                </div>
                {!PASSWORDS_MATCH && (
                    <div className='validator'>
                        <span>* passwords don't match</span>
                    </div>
                )}
                <button className='submit-button' type='submit'>Submit</button>
            </form>
           
        </div>
    </div>
  )
}

export default ChangePassword