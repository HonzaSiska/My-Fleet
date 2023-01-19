import React, { useState } from 'react'
import { useEffect } from 'react'
import { useVehiclesContext } from '../../../hooks/useVehiclesContext'
import { useAuthContext } from '../../../hooks/useAuthContext'
import  SearchIcon   from '../../../assets/lupa.svg'
import { NavLink, useParams } from 'react-router-dom'

import EditIcon from '../../../assets/edit.svg'
import Loader from '../../Loader/Loader'
import FoundMaintenance from './FoundMaintenance'


const MaintenanceSearch = () => {

    const [ canFetch, setCanFetch] = useState( false )
    const [ keyword, setKeyword ] = useState('')
    const [ page, setPage ] = useState(0)
    const [ foundRecords, setFoundRecords ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ results, setResults ] = useState(0)
    const { user } = useAuthContext()
    const { id } = useParams()

    const handleKeywordSearch = (keyword) => {
        !canFetch && setCanFetch(true)
        setKeyword(keyword)
    }

    const fetchMaintenance = async () => {
        setIsLoading(true)
        const response = await fetch(`/api/maintenance/search/${id}?page=${page}&keyword=${keyword}`, {
            headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' },
            method: 'POST',
        })
        const json = await response.json()
        
        if (json.success) {
            
            setResults(json.count)
    
           console.log('found maintenance', json.maintenance)
            
            setFoundRecords(json.maintenance)
            // dispatch({ type: 'SET_FUELS', payload: json.fuels })
            setIsLoading(false)
        }
    }
    
      useEffect(() => {
        if(user  &&  canFetch && keyword){
            fetchMaintenance()
        }
      },[keyword])
      return (
        <div className='trips-wrapper'>
            <div className='search-forms'>
                
                <form className='trip-search-form'>
                    <div className='input-group'>
                        <label>Search by location or description</label>
                        <input 
                            className='round-corners-large' 
                            type='text'
                            onChange={(e)=> handleKeywordSearch(e.target.value)}
                        />
                    </div>    
                </form>
            </div>
            {
                isLoading ? (
                    <Loader/>
                ) : (
                    <div className='results-group'>
                        <FoundMaintenance foundRecords={foundRecords} id={id}/>
                    </div>
                )
            }
    </div>
    )
}

export default MaintenanceSearch