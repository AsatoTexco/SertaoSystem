'use client'
import Menu from '@/components/menu/Menu'
import React, { useEffect, useRef, useState } from 'react'
import './cad_product.css'

import { library } from '@fortawesome/fontawesome-svg-core' 
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { validar_cookies } from '@/app/lib/cookies'
import Cookies from 'js-cookie'


function page() {
   
     
    // const [imagem, setImagem] = useState("")
    const [titulo, setTitulo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [valor, setValor] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [visibleIcon, setVisibleIcon] = useState(true)
    const [srcImage, setSrcImage] = useState("")
    const inputRef = useRef(null);

    const imageTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/tiff'
    ];

    function isFloat(value) {
        return Number.isFinite(value) && !Number.isInteger(value);
    } 

    function handleClickImage(e){ 
        inputRef.current.click();
    }
    function handleChangeImage(e){ 
        
        if(typeof e.target.files[0] != "undefined"){
            
            if(imageTypes.includes(e.target.files[0].type)){
                
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    const base64String = reader.result;  
                    setSrcImage(base64String)
                    setVisibleIcon(false)
                }; 
    
                reader.readAsDataURL(file);
            }
        }

    }
    async function handleSubmit(e){ 
        e.preventDefault()
  
        let req = await fetch("/api/products",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            },
            body:JSON.stringify({
                titulo:titulo,
                descricao:descricao,
                valor:valor,
                qnt:quantidade,
                image:srcImage
            })
        })
        let res = await req.json()
        if(res.status){
            // MODAL?
            alert("Cadastrado com Sucesso!")
        } 
    } 

    const router = useRouter()  
    const [load, setLoad] = useState(true)
    useEffect(() => { 
        async function validarCookie(){
          // validando se esta logado
          let cookieV = await validar_cookies(Cookies.get("token"),router)  
          if(cookieV){
            setLoad(false)
          }
        } 
        validarCookie()
    },[router]) 
    if(load){
      return <div className='products_bg'><Menu/></div>
    }

  return (
    <div className='products_bg'>
      <Menu/>
      <div className='area-cad'>
        <form onSubmit={handleSubmit} className='cad_content'>
            <h1>Novo Produto</h1>
            {/*  , titulo, descricao, valor, quantidade */}
            <div className='area_input_img'  onClick={handleClickImage}>
                <img src={srcImage} className='img_preview' style={{display: visibleIcon ? "none" : "block"}}/>
                <FontAwesomeIcon icon="fa-solid fa-images" id='icon_remover' className='icon_img_input' size="2xl" style={{color: "#ffffff",display: visibleIcon ? "block" : "none" }} />
                <input type='file' ref={inputRef} id='input_img' onChange={handleChangeImage}/>
            </div>

            <div className='area_inputs'>
                <input type='text' placeholder='Título' onChange={(e) => {setTitulo(e.target.value)}} className='input_text'/>
                <input type='text' placeholder='Descrição' onChange={(e) => {setDescricao(e.target.value)}} className='input_text'/>
                <input type='text' placeholder='Valor'  onChange={(e) => {setValor(e.target.value)}} className='input_number'/>
                <input type='text' placeholder='Quantidade' onChange={(e) => {setQuantidade(e.target.value)}}  className='input_number'/>
            </div>
            
            <input type='submit'  className='btn_sub' value={"Cadastrar"} />
            
        </form> 
      </div>
    </div>
  )
}

export default page
library.add(fab,fas,far)