# Passos para Compilar, Testar e Implantar o Contrato Inteligente

Este guia descreve o processo para gerenciar o ciclo de vida do contrato inteligente usando Hardhat.

## 1. Instalação das Dependências

Este comando instalará todas as dependências do projeto, incluindo Hardhat e suas bibliotecas auxiliares, conforme definido no `package.json`.

```bash
npm install
```

## 2. Limpar o Cache e os Artefatos

Este comando remove o cache do Hardhat e os artefatos de compilações anteriores. É uma boa prática executá-lo para garantir uma compilação limpa.

```bash
npx hardhat clean
```

## 3. Compilar o Contrato

Este comando compila os contratos inteligentes do projeto, localizados na pasta `contracts/`. Os artefatos da compilação (ABI, bytecode) serão salvos na pasta `artifacts/`.

```bash
npx hardhat compile
```

## 4. Executar os Testes

Este comando executa os testes automatizados para os contratos, que estão localizados na pasta `test/`. Os testes garantem que a lógica do contrato funcione como esperado.

```bash
npx hardhat test
```

## 5. Implantar (Deploy) o Contrato

Este comando executa o script de implantação (`scripts/deploy.ts`) na rede de testes `scrollSepolia`. Certifique-se de que sua configuração de rede em `hardhat.config.ts` está correta e que você possui fundos na carteira correspondente.

```bash
npx hardhat run scripts/deploy.ts --network scrollSepolia
```
