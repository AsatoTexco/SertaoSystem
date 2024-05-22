'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'    
import { validar_cookies } from '../lib/cookies' 
import './home.css'
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import Menu from '@/components/menu/Menu'
import CardFunction from '@/components/functionCard/CardFunction'
import Cookies from 'js-cookie'


 


export default function Home() {
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
      return <div className='home_page'><Menu/></div>
    }
 
  

 

  return (
    <div className='home_page'>
      <Menu />
      <div className='cards_home'>
        <CardFunction img_src="https://www.tce.pi.gov.br/wp-content/uploads/2019/04/cadastro.jpg" text="Cadastrar Produtos" desc="Nesta página você pode cadastrar novos Produtos" link="/produtos/cadastrar"/>
        <CardFunction img_src="https://ecommercenapratica.com/wp-content/uploads/2020/12/mix-de-produtos-capa-1.png" text="Listar Produtos" desc="Nesta página você pode Visualizar todos os Produtos" link="/produtos/"/>
        {/* <CardFunction img_src="https://www.tce.pi.gov.br/wp-content/uploads/2019/04/cadastro.jpg" text="Cadastrar Produtos" desc="Nesta página você pode cadastrar novos Produtos" link="/produtos/cadastrar"/>    */}
      </div>
    </div>
  );
}


 