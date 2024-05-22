import { saveBase64Image, uniqid } from '@/app/lib/image';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request) {
  try {
    const result =
      await sql`SELECT * FROM products`;
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request) {
    try {  

        // VALIDAR O TOKEN ENVIADO PELO CLIENT-SIDE 
        const authorization = request.headers.get("Authorization")
        const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN 
        
        if (authorization && authorization.startsWith('Bearer ')) {
            // Extrair o token JWT removendo o prefixo "Bearer "
            const token = authorization.substring(7);   
            jwt.verify(token,JWT_SECRET_TOKEN) 
             
        } else {
            return NextResponse.json({ response:"Você não tem permissão para isso",status:false }, { status: 403 });
        } 
        // ========================================
        const body = await request.json(); 
        const {titulo, descricao, valor, qnt, image} = body 

        var name_img

        if(image){
            name_img = uniqid("img_")+".jpg"
            saveBase64Image(image, name_img); 
            
        } else{
             name_img = "default.jpg"
        }
        
        const result = await sql.query("INSERT INTO products (titulo, descricao, valor, qnt, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",[titulo,descricao,valor,qnt, name_img])
          
        return NextResponse.json({ result: result.rows[0], status:true }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error,status:false }, { status: 500 });
    }
}