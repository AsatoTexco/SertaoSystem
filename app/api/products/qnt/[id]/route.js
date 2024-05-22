import { saveBase64Image, uniqid } from '@/app/lib/image';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'
export const dynamic = 'force-dynamic' // defaults to auto

 


export async function PUT(request, { params }) {
    try {
       
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



  
      const { qnt } = body;
      if (!qnt) {
        return NextResponse.json({ response: "Falta parâmetros", status: false }, { status: 400 });
      }
  
       
      const result = await sql.query(
        "UPDATE products SET qnt = $1 WHERE id = $2 RETURNING *",
        [qnt, params.id]
      );
  
      return NextResponse.json({ result: result.rows[0], status: true }, { status: 200 });
  
    } catch (error) {
      console.error('Erro ao processar a requisição PUT:', error);
      return NextResponse.json({ error: 'Erro ao processar a requisição' }, { status: 500 });
    }
  }