export  async function validar_cookies(token, router){
     
    const req = await fetch("/api/users/validate-token",
      {
        method:"POST",
        body: JSON.stringify({token:token})
      }
    )  
    const res = await req.json()  
    if(!res.status){
       router.push("/?error=2")
       return false
    }
    return true
  }
 
