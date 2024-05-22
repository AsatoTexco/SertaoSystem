import { saveBase64Image, uniqid } from '@/app/lib/image';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request,{params}) {
  try { 
    const result = await sql.query("SELECT * FROM products WHERE id = $1", [params.id])
    if(result.rowCount > 0){
        return NextResponse.json({result: result.rows, status:true}, { status: 200 }); 
    }
    return NextResponse.json({status:false}, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
} 


export async function PUT(request, { params }) {
    try {
      // Extração do corpo da requisição
     

      const body = await request.json();
  
      // VALIDAÇÃO DO TOKEN ENVIADO PELO CLIENT-SIDE
      const authorization = request.headers.get("Authorization");
      const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
  
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return NextResponse.json({ response: "Você não tem permissão para isso", status: false }, { status: 403 });
      }
  
      const token = authorization.substring(7);
      try {
        jwt.verify(token, JWT_SECRET_TOKEN);
      } catch (err) {
        return NextResponse.json({ response: "Token inválido ou expirado", status: false }, { status: 403 });
      }
      // ========================================
  
      const { titulo, descricao, valor, qnt, image } = body;
      if (!titulo || !descricao || !valor || !qnt) {
        return NextResponse.json({ response: "Falta parâmetros", status: false }, { status: 400 });
      }
  
      let name_img;
      if (image) {
        name_img = uniqid("img_") + ".jpg";
        saveBase64Image(image, name_img);
      } else {
        name_img = "default.jpg";
      }
  
      const result = await sql.query(
        "UPDATE products SET titulo = $1, descricao = $2, valor = $3, qnt = $4, image = $5 WHERE id = $6 RETURNING *",
        [titulo, descricao, valor, qnt, name_img, params.id]
      );
  
      return NextResponse.json({ result: result.rows[0], status: true }, { status: 200 });
  
    } catch (error) {
      console.error('Erro ao processar a requisição PUT:', error);
      return NextResponse.json({ error: 'Erro ao processar a requisição' }, { status: 500 });
    }
  }



  export async function DELETE(request, { params }) {
    try {
      // Extração do corpo da requisição
     
 
      // VALIDAÇÃO DO TOKEN ENVIADO PELO CLIENT-SIDE
      const authorization = request.headers.get("Authorization");
      const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
  
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return NextResponse.json({ response: "Você não tem permissão para isso", status: false }, { status: 403 });
      }
  
      const token = authorization.substring(7);
      try {
        jwt.verify(token, JWT_SECRET_TOKEN);
      } catch (err) {
        return NextResponse.json({ response: "Token inválido ou expirado", status: false }, { status: 403 });
      }
      // ========================================
  
       
      const result = await sql.query(
        "DELETE FROM products WHERE id = $1 RETURNING *",
        [params.id]
      );
  
      return NextResponse.json({ result: result.rows[0], status: true }, { status: 200 });
  
    } catch (error) {
      console.error('Erro ao processar a requisição PUT:', error);
      return NextResponse.json({ error: 'Erro ao processar a requisição' }, { status: 500 });
    }
  }