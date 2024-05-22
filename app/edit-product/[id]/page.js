'use client'
import Menu from '@/components/menu/Menu'
import React, { useEffect, useRef, useState } from 'react'
import './edit_product.css'

import { library } from '@fortawesome/fontawesome-svg-core' 
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { validar_cookies } from '@/app/lib/cookies'
import Cookies from 'js-cookie'


function Page({ params }) {
 
  const [dataProd, setDataProd] = useState({});
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [visibleIcon, setVisibleIcon] = useState(true);
  const [srcImage, setSrcImage] = useState('');

  const inputRef = useRef(null);

  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/tiff'];

  const handleClickImage = (e) => {
    // #mudar
    inputRef.current.click();
  };

  const handleChangeImage = (e) => {
    if (imageTypes.includes(e.target.files[0].type)) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setSrcImage(base64String);
        setVisibleIcon(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let req = await fetch('/api/products/'+params.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get("token")}`
      },
      body: JSON.stringify({
        titulo: titulo,
        descricao: descricao,
        valor: valor,
        qnt: quantidade,
        image: srcImage
      })
    });

    let res = await req.json(); 
    if (res.status) {
      // MODAL?
      alert('Editado com Sucesso!');
    }
  };
  const router = useRouter()  
  const handleDelete = async () => {

    let req = await fetch('/api/products/'+params.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get("token")}`
      }
    });

    let res = await req.json(); 
    if (res.status) {
      // MODAL?
      alert('Excluído com Sucesso!');
      router.push("/produtos")
      
    }

  }
  
  
  useEffect(() => {
    const handleFetchById = async () => {
      let req = await fetch('/api/products/' + params.id);
      let res = await req.json();
      if (res.status) {
        const product = res.result[0];
        setDataProd(product);
        setTitulo(product.titulo);
        setDescricao(product.descricao);
        setValor(product.valor);
        setQuantidade(product.qnt);
        if (product.image) {
          setSrcImage("../../storage/"+product.image);
          setVisibleIcon(false);
        }
      }
    };

    handleFetchById();
  }, [params.id]);



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
      <div className='area-cad'>
        <form onSubmit={handleSubmit} className='cad_content'>
          <h1>Editar Produto</h1>
          <div className='area_input_img' onClick={handleClickImage}>
            <img src={srcImage} className='img_preview' style={{ display: visibleIcon ? 'none' : 'block' }} />
            <FontAwesomeIcon icon="fa-solid fa-images" id='icon_remover' className='icon_img_input' size="2xl" style={{ color: '#ffffff', display: visibleIcon ? 'block' : 'none' }} />
            <input type='file' ref={inputRef} id='input_img' onChange={handleChangeImage} />
          </div>

          <div className='area_inputs'>
            <input type='text' placeholder='Título' value={titulo} onChange={(e) => setTitulo(e.target.value)} className='input_text' />
            <input type='text' placeholder='Descrição' value={descricao} onChange={(e) => setDescricao(e.target.value)} className='input_text' />
            <input type='number' placeholder='Valor' value={valor} onChange={(e) => setValor(e.target.value)} className='input_number' />
            <input type='number' placeholder='Quantidade' value={quantidade} onChange={(e) => setQuantidade(e.target.value)} className='input_number' />
          </div>
          
          <div className='area_btns_subms_edit_pr'> 
            <input type='reset' className='btn_sub' onClick={handleDelete} value={"EXCLUIR"} />
            <input type='submit' className='btn_sub' value={"SALVAR"} />
          </div>

        </form>
      </div>
    </div>
  );
}

export default Page
library.add(fab,fas,far)