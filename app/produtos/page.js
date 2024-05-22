'use client'
import Menu from '@/components/menu/Menu'
import React, { useEffect, useState } from 'react'
import './produtos.css'
import CardProd from '@/components/card_prod/CardProd'
import { useRouter } from 'next/navigation'
import { validar_cookies } from '../lib/cookies'
import Cookies from 'js-cookie'

function Page() {
  

  const [produtos, setProdutos] = useState([]);
  
  useEffect(() => {
    async function fetchProdutos() {
      try {
        const req = await fetch("/api/products");
        const res = await req.json();
        setProdutos(res);
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
      }
    }  
    fetchProdutos();
  }, []);


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
      <Menu />
      <div className='area_produtos'>
        <h1>PRODUTOS</h1>
        <div className='area_cards_prods'>
          {/* Use map para gerar os componentes CardProd para cada produto */}
          {produtos.map(produto => (
            <CardProd key={produto.id} valor={produto.valor} titulo={produto.titulo} qnt={produto.qnt} id_prod={produto.id} img_src={produto.image} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page
