import React, { useState } from 'react'
import './ModalError.css'
function ModalError(props) {

    const [visible, setVisible] = useState(true) 
  return (
    <div className={visible?"modal_error":"modal_error invisible_modal"}>
        <button onClick={(e) => {
            setVisible(false)
        }}>X</button>
        <h1>{props.text_modal}</h1>
    </div>
  )
}

export default ModalError
