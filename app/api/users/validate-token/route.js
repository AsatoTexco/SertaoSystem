import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken"
// import {cookies } from 'next/headers';

export const dynamic = 'force-dynamic' // defaults to auto

export async function POST(request) {
  try {
        const body = await  request.json()
        const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN
        if(!body.token){
            return NextResponse.json({ status:false }, { status: 200 });
        }  
        jwt.verify(body.token, JWT_SECRET_TOKEN) 
        return NextResponse.json({ status:true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status:false }, { status: 200 });
  }
}
