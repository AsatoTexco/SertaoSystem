import React, { useRef, useState } from 'react'
import './CardProd.css'
import Link from 'next/link'
import { library } from '@fortawesome/fontawesome-svg-core' 
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookies from 'js-cookie'

function CardProd(props) {

  const btn_add = useRef()
  const btn_min = useRef()
  const [qnt, setQnt] = useState(props.qnt)

  const timeoutRef = useRef(null); 
  const handleAdd = () => {

    setQnt(qnt => qnt + 1);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      // console.log(qnt+1)
        saveQnt(qnt+1)
    }, 3000);

  }; 
  const handleMin = () => {
    if(qnt>0){
      setQnt(prevQnt => prevQnt - 1);  
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        // console.log(qnt-1)
        saveQnt(qnt-1)
      }, 3000);

    }
  };

  const saveQnt = async (quantidadeAtt) => {

    let req = await fetch('/api/products/qnt/'+props.id_prod, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get("token")}`
      },
      body: JSON.stringify({
         qnt:quantidadeAtt 
      })

    });

    let res = await req.json();
    

  }
  

  return (
    <div className='card_produto'>
       <img src={"./storage/"+props.img_src} alt="" />
       <h1>R$ {props.valor}</h1>
       <p>{props.titulo}</p>
       <div className='area_quantidade_prod'> 

          <button ref={btn_min} onClick={handleMin} className='btn_somas'><FontAwesomeIcon icon="fa-solid fa-minus" /></button>
          {qnt} 
          <button ref={btn_add} onClick={handleAdd}  className='btn_somas'><FontAwesomeIcon icon="fa-solid fa-plus" /></button> 
       
       </div>
       <Link className='btn_edit_prod' href={"/edit-product/"+props.id_prod}>Editar</Link>
    </div>
  )
}

export default CardProd
library.add(fab,fas,far)