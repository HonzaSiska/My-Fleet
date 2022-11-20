import React from 'react'
import './Pagination.css'
const Pagination = ({recordsLeft, page,  results, setPage, resultsPerPage}) => {

    const lastPage = Math.ceil((results / resultsPerPage) -1 )

    const nextPage = () => {
        if(recordsLeft <= 0) {
            return
        }else{
            setPage(prevState => prevState +1)
        }    
    }

    const prevPage = () => {
        if(page === 0) {
            return
        }else{
            setPage(prevState => prevState -1)
        }
        
    }
    return (
        <div className='pagination'>
            <button className='prevBtn' style={{fontWeight: page !== 0 &&  'bold'}} disabled={page === 0} onClick={()=>setPage(0)}>{'<<'}</button>
            <button className='prevBtn' style={{fontWeight: page !== 0 &&  'bold'}} disabled={page === 0} onClick={prevPage}>prev</button>
            <button className='prevBtn' style={{fontWeight: recordsLeft > 0 &&  'bold'}} disabled={recordsLeft <= 0} onClick={nextPage} >next</button>
            <button className='prevBtn' style={{fontWeight: recordsLeft > 0 &&  'bold'}} disabled={lastPage === page || lastPage <= 0} onClick={()=>setPage(lastPage)} >{'>>'}</button>
        </div>
    )
}

export default Pagination