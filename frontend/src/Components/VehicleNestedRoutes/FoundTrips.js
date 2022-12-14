import React from 'react'
import EditIcon from '../../assets/edit.svg'
import CheckedIcon from '../../assets/checked.svg'
import { NavLink } from 'react-router-dom'
import { useVehiclesContext } from '../../hooks/useVehiclesContext'

const FoundTrips = ({trips, id}) => {

  const { dispatch } = useVehiclesContext()  
  return (
    <div>
        {
                trips && trips.map((trip, index)=> (<div key={index} className='found-trip'>
                    <div className='found-trip-item'>
                        <span className='bold'>{trip.from + ' - '}</span>
                        <span className='bold'>{trip.to}</span>
                    </div>
                    <div className='found-trip-item'>
                        <span className='duration'>{` ${trip.date}`}</span>
                    </div>
                    <div className='found-trip-item'>
                        {
                            trip.completed 
                            ? <img src={CheckedIcon} alt={ CheckedIcon }/>
                            : <span style={{color: 'red', fontSize:'11px' }}>still open </span>
                        }
                    </div>
                    
                    <NavLink  onClick={()=>dispatch({type: 'CLOSE_MENU'})}  to={`/vehicle/${id}/trips/update/${trip._id}`}><img src={EditIcon} alt='edit'/></NavLink>
                    
                </div>))
            }
    </div>
  )
}

export default FoundTrips