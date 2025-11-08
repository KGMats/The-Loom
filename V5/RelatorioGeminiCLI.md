# Relatório de Desenvolvimento e Alterações no Projeto

Este documento detalha o histórico de alterações, decisões arquitetônicas e correções de bugs realizadas no projeto DePIN.

## 1. Refatoração Inicial: De Frontend para API

A primeira solicitação foi para reestruturar o projeto, que originalmente possuía a lógica de transação nas páginas React (`pages/client.tsx`, `pages/provider.tsx`), para um modelo de API backend.

### 1.1. Primeira Abordagem (Modelo Centralizado - Descartado)

*   **Ação:** A lógica de interação com o smart contract foi movida para novos endpoints de API.
*   **Implementação:**
    *   Os arquivos `pages/client.tsx` e `pages/provider.tsx` foram removidos.
    *   Foi criado um serviço `lib/ethers-service.ts` que utilizava uma **chave privada** armazenada no `.env` para assinar transações diretamente no backend.
    *   Foram criados endpoints como `POST /api/jobs/post` que executavam as transações.
*   **Problema:** Esta abordagem centralizava o projeto, indo contra o princípio de um DApp onde o usuário final deve assinar as transações.

---

## 2. Correção de Rumo: Modelo de API de Preparação (Arquitetura Atual)

Após um feedback sobre a necessidade de usar carteiras como o RainbowKit no frontend, a arquitetura foi completamente refatorada para um modelo descentralizado e seguro.

*   **Ação:** Transformar a API de "executora" para "preparadora" de transações.
*   **Implementação:**
    *   Toda a lógica de chaves privadas e assinatura foi **removida** do backend.
    *   O `lib/ethers-service.ts` foi modificado para ser um serviço de **leitura-apenas**, sem acesso a carteiras.
    *   Os endpoints de API foram recriados para apenas **preparar os dados brutos** da transação e enviá-los como JSON para o frontend.
        *   `POST /api/jobs/prepare-post`
        *   `POST /api/jobs/[id]/prepare-action`
    *   O frontend agora é responsável por receber esses dados e usar a carteira do usuário (via RainbowKit/wagmi) para assinar e enviar a transação.

---

## 3. Criação do Frontend de Teste (`frontend-tester`)

Para validar a nova arquitetura da API, um projeto de frontend de prova de conceito foi criado.

*   **Ação:** Construir uma aplicação Next.js separada para interagir com a API.
*   **Tecnologias:** Next.js, TypeScript, RainbowKit, wagmi, e viem.
*   **Funcionalidades Implementadas:**
    *   Conexão de carteira com RainbowKit.
    *   Listagem de "Jobs Abertos" e "Meus Jobs" consumindo a API de leitura.
    *   Formulário para postar um novo job.
    *   Botões para aceitar, submeter resultado e aprovar jobs.
    *   Lógica completa do fluxo "preparar-assinar-enviar".
*   **Observação:** Inicialmente, o projeto foi criado em uma pasta separada, mas devido a restrições do ambiente, foi movido para `app/frontend-tester`.

---

## 4. Resolução de Problemas e Refinamentos

Durante o desenvolvimento, vários problemas foram identificados e corrigidos.

### 4.1. Erro do Indexer: `filter not found`
*   **Problema:** O script `lib/indexer.ts`, usando `JsonRpcProvider` (HTTP), perdia a conexão com o nó RPC, fazendo com que o filtro de eventos expirasse.
*   **Solução:** O provedor no `indexer.ts` foi trocado para `WebSocketProvider`, que mantém uma conexão persistente. Uma nova variável de ambiente (`SCROLL_SEPOLIA_WSS_RPC_URL`) foi adicionada para a URL do WebSocket.

### 4.2. Inconsistência de Provedor
*   **Problema:** O `lib/ethers-service.ts` da API ainda usava `JsonRpcProvider`, enquanto o indexer usava `WebSocketProvider`.
*   **Solução:** Para manter a consistência e robustez, o `lib/ethers-service.ts` também foi atualizado para usar o `WebSocketProvider`.

### 4.3. Erro de CORS (Cross-Origin Resource Sharing)
*   **Problema:** O frontend (`localhost:3001`) não conseguia fazer requisições para a API (`localhost:3000`) devido à política de segurança do navegador.
*   **Solução em Etapas:**
    1.  Adicionada uma configuração de `headers` no `next.config.ts` do backend para permitir requisições de outras origens.
    2.  O erro persistiu para requisições `POST` com status `405 Method Not Allowed`.
    3.  O problema real foi identificado: o código das rotas da API estava rejeitando as requisições de "preflight" (`OPTIONS`) do navegador.
    4.  A solução final foi adicionar um bloco no início de cada rota de API para responder com `200 OK` a qualquer requisição `OPTIONS`.

### 4.4. Erro de Hidratação no Frontend
*   **Problema:** O frontend apresentava um erro de "Hydration failed" porque o HTML renderizado no servidor (estado "desconectado") era diferente do HTML inicial no cliente (que podia detectar um estado "conectado").
*   **Solução:** Foi implementado um estado `isClient` no `index.tsx` do frontend. O conteúdo dinâmico que depende do estado da carteira agora só é renderizado após o componente ser montado no cliente, garantindo a correspondência do HTML e eliminando o erro.

### 4.5. Alinhamento de Versões
*   **Problema:** Foi notado que o projeto `app` principal usava uma versão experimental do Next.js (`16.0.1`), enquanto o `frontend-tester` foi criado com uma versão estável mais antiga.
*   **Solução:** O `package.json` do `frontend-tester` foi atualizado para usar as mesmas versões de dependências (`next`, `react`, etc.) do projeto principal, garantindo consistência.

---

## 5. Estado Atual

O projeto agora consiste em um monorepo funcional com um backend robusto e um frontend de teste que validam uma arquitetura de DApp descentralizada e segura. O fluxo completo, desde a postagem de um job até a sua aprovação, está funcional.
