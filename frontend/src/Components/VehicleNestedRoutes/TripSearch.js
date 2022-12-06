import React from 'react'
import  SearchIcon   from '../../assets/lupa.svg'

const TripSearch = () => {
  return (
    <div className='trips-wrapper'>
        <div className='search-forms'>
            <form className='date-search-form'>
                <div>
                    <div className='input-group'>
                        <label>Start date</label>
                        <input type='datetime-local'/>
                    </div>
                    <div className='input-group'>
                        <label>End Date</label>
                        <input type='datetime-local'/>
                    </div>
                </div>
                <img className='lupa' src={SearchIcon} alt='SearchIcon'/>
                
            </form>
            <form className='trip-search-form'>
                <div className='input-group'>
                    <label>Search by place</label>
                    <input className='round-corners-large' type='text'/>
                </div>    
            </form>
        </div>
    </div>
  )
}

export default TripSearch