import React from 'react'
import ReactDom from 'react-dom'

//styles
import './Modal.css'

export default function Modal({children}) {
  return ReactDom.createPortal (
    <>
        <div className='modal'>
            <div className='modal-content'>
                {children}
            </div>
            
        </div>
    </>,
    document.getElementById('portal')
  )
}
