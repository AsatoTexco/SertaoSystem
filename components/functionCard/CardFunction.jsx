import React from 'react'
import './CardFunction.css'
import Link from 'next/link'

function CardFunction(props) {
  return (
    <div className='cardFunction'>
      <img src={props.img_src} alt="" className='img_card_func' />
      <h1 className='text_card'>{props.text}</h1>
      <p className='desc_card'>{props.desc}</p>
      <Link className="btn_location" href={props.link}>IR</Link>
    </div>
  )
}

export default CardFunction
