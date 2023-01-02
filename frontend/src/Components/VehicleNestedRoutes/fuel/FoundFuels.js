import React from 'react'
import EditIcon from '../../../assets/edit.svg'
import CheckedIcon from '../../../assets/checked.svg'
import { NavLink } from 'react-router-dom'
import { useVehiclesContext } from '../../../hooks/useVehiclesContext'

const FoundFuels = ({ fuels, id }) => {

    const { dispatch } = useVehiclesContext()  

    return (
        <div>
            {
                fuels && fuels.map((fuel, index) => (<div key={index} className='found-trip'>
                    <div className='found-trip-item'>
                        <span className='bold'>{fuel.location}</span>
                    </div>
                    <div className='found-trip-item'>
                        <span className='duration'>{` ${fuel.formatedDate}`}</span>
                    </div>
                    {/* <div className='found-trip-item'>
                        {
                            trip.completed
                                ? <img src={CheckedIcon} alt={CheckedIcon} />
                                : <span style={{ color: 'red', fontSize: '11px' }}>still open </span>
                        }
                    </div> */}

                    <NavLink onClick={() => dispatch({ type: 'CLOSE_MENU' })} to={`/vehicle/${id}/fuel/update/${fuel._id}`}><img src={EditIcon} alt='edit' /></NavLink>

                </div>))
            }
        </div>
    )
}

export default FoundFuels