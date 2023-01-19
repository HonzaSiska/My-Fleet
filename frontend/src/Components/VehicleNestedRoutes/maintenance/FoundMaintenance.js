import React from 'react'
import EditIcon from '../../../assets/edit.svg'
import { NavLink } from 'react-router-dom'
import { useVehiclesContext } from '../../../hooks/useVehiclesContext'

const FoundMaintenance = ({ foundRecords, id }) => {

    const { dispatch } = useVehiclesContext()
    console.log('foundRecords', foundRecords)
  return (
    <div>
    {
        foundRecords && foundRecords.map((item, index) => (<div key={index} className='found-trip'>
            
            <div className='found-trip-item'>
                <span className='bold'>{` ${item.location}`}</span>
            </div>
            <div className='found-trip-item'>
                <span className='duration'>{item.formattedDate}</span>
            </div>
            <div className='found-trip-item'>
                <span className='duration'>{` ${item.description} `}</span>
            </div>
            {/* <div className='found-trip-item'>
                {
                    trip.completed
                        ? <img src={CheckedIcon} alt={CheckedIcon} />
                        : <span style={{ color: 'red', fontSize: '11px' }}>still open </span>
                }
            </div> */}

            <NavLink onClick={() => dispatch({ type: 'CLOSE_MENU' })} to={`/vehicle/${id}/maintenance/update/${item._id}`}><img src={EditIcon} alt='edit' /></NavLink>

        </div>))
    }
</div>
  )
}

export default FoundMaintenance