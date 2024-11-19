#!/bin/bash

# Este script automatiza a configuração de Server Actions em um projeto Next.js.

# Verifica se o comando npm está instalado
command -v npm >/dev/null 2>&1 || { echo "npm não encontrado. Por favor, instale o Node.js e npm"; exit 1; }

# Cria o diretório do projeto Next.js (caso ainda não exista)
if [ ! -d "my-next-app" ]; then
  echo "Criando um novo projeto Next.js..."
  npx create-next-app@latest my-next-app --typescript
else
  echo "Projeto Next.js já encontrado."
fi

# Navega até o diretório do projeto
cd my-next-app || exit

# Instala as dependências necessárias
echo "Instalando dependências..."
npm install

# Criação de exemplo para Server Actions
echo "Criando exemplo de Server Action..."

# Cria o arquivo actions.ts
cat <<EOL > app/actions.ts
'use server'

export async function createUser(formData: FormData) {
  // Exemplo de Server Action
  const name = formData.get('name')
  if (!name) {
    throw new Error('Nome é obrigatório!')
  }
  
  // Aqui você pode adicionar a lógica de manipulação de dados
  return { success: true, message: 'Usuário criado com sucesso!' }
}
EOL

# Criação de um exemplo de componente de formulário com Server Action
cat <<EOL > app/page.tsx
import React from 'react'

export default function Page() {
  async function handleSubmit(formData: FormData) {
    'use server'
    const result = await createUser(formData)
    if (result.success) {
      alert(result.message)
    } else {
      alert('Falha ao criar usuário!')
    }
  }

  return (
    <form action={handleSubmit}>
      <input type="text" name="name" required />
      <button type="submit">Criar Usuário</button>
    </form>
  )
}
EOL

# Configura variáveis de ambiente
echo "Configurando variáveis de ambiente..."
cat <<EOL > .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
EOL

# Adiciona configuração do Next.js para Server Actions (experimental)
echo "Configurando serverActions no next.config.js..."

cat <<EOL > next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverActions: true
  }
}
EOL

# Sugestão para rodar o projeto
echo "Tudo configurado! Agora você pode rodar seu projeto com:"
echo "  npm run dev"
echo "O exemplo de Server Action já está configurado. Teste acessando o formulário na página inicial."
