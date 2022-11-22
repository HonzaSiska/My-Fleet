import React from 'react'
import './Pagination.css'
const Pagination = ({recordsLeft, page,  results, setPage, resultsPerPage, extended = true}) => {

    const lastPage = Math.ceil((results / resultsPerPage) -1 )

    const numberOfPages = Math.ceil(results / resultsPerPage)

   const pagesArray = []

   for( let i = 1; i <= numberOfPages; i++){
    pagesArray.push(i)
   }

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
        <>  
            <div className='page-counter'>
                <span>{`${page + 1}/${numberOfPages}`}</span>
            </div>
            <div className='pagination'>
                <button className='prevBtn' style={{fontWeight: page !== 0 &&  'bold', cursor: page !== 0 &&  'pointer'}} disabled={page === 0} onClick={()=>setPage(0)}>{'<<'}</button>
                <button className='prevBtn' style={{fontWeight: page !== 0 &&  'bold', cursor: page !== 0 &&  'pointer'}} disabled={page === 0} onClick={prevPage}>prev</button>
                <button className='prevBtn' style={{fontWeight: recordsLeft > 0 &&  'bold', cursor: recordsLeft > 0 &&  'pointer'}} disabled={recordsLeft <= 0} onClick={nextPage} >next</button>
                <button className='prevBtn' style={{fontWeight: recordsLeft > 0 &&  'bold',cursor: recordsLeft > 0 &&  'pointer'}} disabled={lastPage === page || lastPage <= 0} onClick={()=>setPage(lastPage)} >{'>>'}</button>
            </div>
            {   
                //Show page number bottoms if prop extended is true
                extended && (
                    <div className='page-numbers'>
                        {
                            pagesArray.map(currentPage => (
                                <button className='' style={
                                    {
                                        fontWeight: page + 1 === currentPage &&  'bold', 
                                        background: page + 1 === currentPage &&  'white',
                                        cursor: page + 1 === currentPage &&  'default'
                                    }} 
                                    disabled={page + 1 == currentPage} 
                                    onClick={()=>setPage(currentPage - 1)}
                                >
                                    {currentPage}
                                </button>
                            ))
                        }
                    </div>
                )
            }
            
        </>
        
    )
}

export default Pagination