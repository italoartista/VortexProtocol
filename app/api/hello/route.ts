// app/api/hello/route.ts

import { NextResponse } from 'next/server';

// Uma função simples para ser chamada no frontend
export async function POST(request: Request) {
  const { name } = await request.json();

  // Simula alguma lógica no servidor
  const greeting = `Hello, ${name}!`;

  // Retorna a resposta para o frontend
  return NextResponse.json({ greeting });
}
