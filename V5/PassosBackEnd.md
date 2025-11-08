# Passos para configurar e executar o Back-End (API)

Este guia descreve os passos para instalar as dependências, configurar o ambiente e iniciar o servidor da API do back-end.

## 1. Instalação das Dependências

Este comando instalará todas as dependências do projeto que estão listadas no arquivo `package.json`.

```bash
npm install
```

## 2. Configuração do Ambiente

Crie dois arquivos na raiz do projeto: `.env` e `.env.local`. Adicione as seguintes variáveis de ambiente a ambos os arquivos.

**Arquivo: `.env` e `.env.local`**
```
# URL de conexão para o banco de dados SQLite.
DATABASE_URL="file:./dev.db"

# URL do WebSocket RPC para a rede de testes Sepolia da Scroll.
SCROLL_SEPOLIA_WSS_RPC_URL=<SEU_RPC_WSS_DA_SCROLL_SEPOLIA>

# Endereço do contrato inteligente implantado.
NEXT_PUBLIC_CONTRACT_ADDRESS=<SEU_ENDERECO_DE_CONTRATO>
```

**Nota:** Substitua `<SEU_RPC_WSS_DA_SCROLL_SEPOLIA>` e `<SEU_ENDERECO_DE_CONTRATO>` pelos valores corretos.

## 3. Gerar o Cliente Prisma

Este comando gera o cliente Prisma com base no seu esquema (`prisma/schema.prisma`). O cliente Prisma é usado para interagir com o banco de dados de forma type-safe.

```bash
DATABASE_URL="file:./dev.db" npx prisma generate
```

## 4. Iniciar o Indexador de Eventos (Listener)

O indexador é um script que escuta os eventos emitidos pelo contrato inteligente e os salva no banco de dados. Execute-o em um terminal separado.

```bash
npx ts-node lib/indexer.ts
```

## 5. Iniciar a API

Este comando inicia o servidor de desenvolvimento da API Next.js.

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000` (ou outra porta, se configurado).