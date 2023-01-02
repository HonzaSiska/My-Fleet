import React from 'react'
import Loading from '../../assets/loader.gif'
import './Loader.css'

const Loader = () => {
  return (
    <div className='loader'>
        <div className='loader-content'>
          <img src={Loading} alt='loader'/>
        </div>
    </div>
  )
}

export default Loader