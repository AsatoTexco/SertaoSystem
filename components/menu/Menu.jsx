import React from 'react'
import './Menu.css'
import { library } from '@fortawesome/fontawesome-svg-core' 
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation' 
import Link from 'next/link'
import Cookies from 'js-cookie'




function Menu() {
    const router = useRouter()
  return (
    <nav className='menu'>

        <FontAwesomeIcon icon="fa-solid fa-wallet"style={{color: "#ffffff",}} />
        <div className='area_links'>
            <Link href={"/home"}>Home</Link>
            <Link href={"/produtos"}>Produtos</Link> 
        </div>
        <button onClick={() => {
            Cookies.set("token","2")
            router.push("/")
        }}> 
          <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" style={{color: "#ffffff",}} /> 
        </button>
        
    </nav>
  )
}

export default Menu

library.add(fab,fas,far)