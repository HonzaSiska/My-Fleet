import React, { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import Eye from '../../assets/eye.png'
import './Auth.css'    
import { isEmail } from '../../utils/regex.js'
import { Link } from 'react-router-dom'

function Signup() {
   
    const [ displayName, setDisplayName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordConfirm, setPasswordConfirm ] = useState('')
    const [ passwordVisible, setPasswordVisible ] = useState(false)
    const [ validator, setValidator ] = useState({
        displayName: false,
        email: false,
        password: false,
        passwordConfirm: false,
       
    })
    const {signup, error, isLoading} = useSignup()
    
    const PASSWORDS_MATCH = password === passwordConfirm

    const handleSubmit = async(e)=> {
        console.log("PASSWORDS_MATCH", PASSWORDS_MATCH)
        console.log(validator)
        e.preventDefault()
        if(
            validator.displayName === false ||
            validator.email=== false ||
            validator.password=== false ||
            !PASSWORDS_MATCH
        ){
            return
        }

        await signup(email, password, displayName)
    }


    const handleEmailChange = (value) => {
       setEmail(value)

       if(isEmail(value)){
        setValidator(prev => ({...prev, email:true}))
       }else{
        setValidator(prev => ({...prev, email:false}))
       }
   
    }
    const handleChangeDisplayName = (value) => {
        setDisplayName(value)

        if(value!==''){
            setValidator(prev => ({...prev, displayName:true}))
        }else{
            setValidator(prev => ({...prev, displayName:false}))
        }

     
    }
    // const handleChangeFleetName = (value) => {
    //     setFleetName(value)

    //     if(value.length < 4){
    //         setValidator(prev => ({...prev, fleetName:false}))
    //     }else{
    //         setValidator(prev => ({...prev, fleetName:true}))
    //     }

     
    // }

    //  let isWhitespace = /^(?=.*\s)/
    const handlePasswordChange = (value) => {
        setPassword(value)

        // const isWhitespace = /^.*(?=\s).*$/
        // let hasUppercase = /(?=.*[A-Z])/
        // let hasLowerCase = /^(?=.*[a-z])/
         
        const  regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,30}$/;
      
        if( regex.test(value) ) {
         setValidator(prev => ({...prev, password:true}))
         console.log('regex',!regex.test(value))
        }else{
         setValidator(prev => ({...prev, password:false}))
        }
        console.log(validator.password)
      
    }
    const handleConfirmPasswordChange = (value) => {

         setPasswordConfirm(value)
       
        
    }

  return (
    <div>
        
        <div className='title'>
            <h2>Signup</h2>
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

                {/* <label>Fleet Name</label>
                <br/>
                <input 
                    type='text'
                    onChange={((e)=>{handleChangeFleetName(e.target.value)})}
                    value={fleetName}
                />
                {!validator.fleetName  && (
                    <div className='validator'>
                        <span>* At least 5 characters</span>
                    </div>
                )} */}
                <label>Display Name</label>
                <br/>
                <input 
                    type='text'
                    onChange={((e)=>{handleChangeDisplayName(e.target.value)})}
                    value={displayName}
                />
                {displayName === ''  && (
                    <div className='validator'>
                        <span>* required</span>
                    </div>
                )}
                
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
                <button className='submit-button' type='submit'  disabled=
                { 
                    (validator.displayName === false ||
                    validator.email=== false ||
                    validator.password=== false ||
                    !PASSWORDS_MATCH) ? true : false
                }

                >Submit</button>
                <div className='link'><Link to='/reset'>Forgot password?</Link></div>
            </form>
           
        </div>
    </div>
  )
}

export default Signup