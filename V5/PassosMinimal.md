# Passos para configurar e executar o Front-End Mínimo

Este guia descreve os passos para instalar as dependências e iniciar a aplicação de front-end.

## 1. Instalação das Dependências

Este comando instalará todas as dependências do projeto, como React e Next.js, que estão listadas no arquivo `package.json`.

```bash
npm install
```

## 2. Configuração do Ambiente

Antes de iniciar a aplicação, é necessário configurar a URL do back-end. Crie um arquivo chamado `.env.local` na raiz do projeto e adicione a seguinte variável:

**Arquivo: `.env.local`**
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Nota:** Se o seu back-end estiver rodando em uma URL diferente, ajuste o valor da variável `NEXT_PUBLIC_API_URL`.

## 3. Iniciar a Aplicação

Este comando inicia o servidor de desenvolvimento do Next.js.

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3001` (ou outra porta, se a 3000 já estiver em uso).
