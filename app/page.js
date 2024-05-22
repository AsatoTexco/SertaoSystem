'use client'
import React, { Suspense, useEffect, useState } from 'react'
import "./login.css"
import { useRouter, useSearchParams } from 'next/navigation' 
import ModalError from '../components/modais/ModalError'
import Cookies from 'js-cookie'

function SearchModal(){
  const searchParams = useSearchParams() 
  const error = searchParams.get("error")
   
    
  if(error == "2"){ 
    return <ModalError text_modal="Faça Login Primeiro"/>
  }else{
    return 
  }
   
  
}
function Home() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [modalViewer, setModalViewer] = useState(false)
  const router = useRouter()
  
  // Setting a cookie
  Cookies.set('token', '2');

  async function handleSubmitForm(){

    let req = await fetch("/api/users/login",{
      method:"POST",
      body: JSON.stringify({
        "username":username,
        "password":password
      })
    })
    let res = await req.json() 
    if(res.status){ 
      Cookies.set('token', res.token);
      router.push("/home")
    }

  }  
  

  return (
    <div className='bg_area'>
      <Suspense>
        <SearchModal/>
      </Suspense>
      <div className='w-96 bg-zinc-950/20 flex flex-col backdrop-blur	 rounded-md py-5 px-11 gap-4'>
          <h1 className='w-full text-center text-3xl	text-sky-50'>Login</h1>
          <input placeholder='Username' className='p-2 rounded-md' value={username}  onChange={(e) => {
            setUsername(e.target.value)  
          }} />
          <input placeholder='Password' type='password' className='p-2 rounded-md'  value={password}  onChange={(e) => {
            setPassword(e.target.value) 
             
          }} />
          <input onClick={handleSubmitForm}   type='submit' value={"Entrar"} className='bg-slate-900  w-28 h-11 rounded-lg self-center text-sky-100 cursor-pointer	'   />
      </div>
    </div>
  )
}

export default Home
