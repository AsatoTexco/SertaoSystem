import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken"

export const dynamic = 'force-dynamic' // defaults to auto

export async function POST(request) {
  try {
        const body = await request.json()
        const {username, password} = body
        const result = await sql.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password])
        
        
        if(result.rowCount > 0){
            
            const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN
             
            // Tempo de expiração do token (1 hora) OPCIONAL 
            const token = jwt.sign(result.rows[0], JWT_SECRET_TOKEN)
            
            // jwt.verify(token, JWT_SECRET_TOKEN)
             
            return NextResponse.json({status:true, token:token}, { status: 200 });


        
        }else{
            return NextResponse.json([], { status: 200 }); 
        }


  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
