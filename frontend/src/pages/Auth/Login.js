import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import './Auth.css'
import { isEmail } from '../../utils/regex.js'
import Eye from '../../assets/eye.png'

function Login() {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordVisible, setPasswordVisible ] = useState(false)
    const [ validator, setValidator ] = useState({
        email: false,
        password: false
    })
    const {login, error, isLoading} = useLogin()
    


    const handleSubmit = async(e)=> {
        e.preventDefault()
        if(
            validator.email=== false ||
            validator.password=== false 
     
        ){
            return
        }
        await login(email, password)
    }

    const handleEmailChange = (value) => {
       setEmail(value)

       if(isEmail(value)){
        setValidator(prev => ({...prev, email:true}))
       }else{
        setValidator(prev => ({...prev, email:false}))
       }
   
    }
    const handlePasswordChange = (value) => {
        setPassword(value)
        if(value !== ''){
            setValidator(prev => ({...prev, password:true}))
           }else{
            setValidator(prev => ({...prev, password:false}))
           }
    }


  return (
    <div>
        <div className='form-title'>
            <h2>Login</h2>
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
                <div className='validator'>
                    <span>{(!validator.password ) && <span>{`* Required`}</span>}</span>
                </div>
                
                
                <button className='submit-button' type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Login