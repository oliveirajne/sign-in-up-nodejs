# sign-in-up-nodejs

## Table of Contents

- [sign-in-up-nodejs](#sign-in-up-nodejs)
  - [Table of Contents](#table-of-contents)
  - [Descrição](#descrição)
  - [Instalação](#instalação)
  - [Desenvlvimento](#desenvolvimento)
  - [Bibliotecas](#bibliotecas)
  - [Endpoints](#endpoints)

## Descrição
- API RESTful de criação de sign up/sign in (Express)
- Persistência de token (JWT)
- Gestão de dependências via gerenciador de pacotes (npm)
- Utilização de Eslint
- MongoDB
- Criptografia não reversível (hash) na senha 

## Instalação

1. Baixar o repositório para a máquina local
2. Digitar `npm install` para instalar as dependências do projeto
3. Digitar `npm start` para iniciar o servidor

## Desenvolvimento
- Sistema operacional: Windows 10
- Editor: Visual Studio Code
- Testes: Postman

## Bibliotecas
- cors
- express
- bcrypt
- nodemon
- jsonwebtoken
- mongoose
- uuid
- eslint

## Endpoints

- **GET** 127.0.0.1:3333
GET simples para verificar se o servidor está OK.

Retorno:
```json=
  OK
```
- **POST** /signup

Entrada:
```json=
{
    "nome": "nome teste",
    "email": "teste@teste.com",
    "senha": "teste",
    "telefones": [
        {
            "numero": "1",
            "ddd": "11"
        },
        {
            "numero": "2",
            "ddd": "22"
        }
    ]
}
```

Retorno:
```json=
  statusCode: 200
  user, id, data_criacao, data_atualizacao, ultimo_login, token

  statusCode: 409
  "email já existente"

  statusCode: 500
  "erro do servidor"
```

- **POST** /signin 

Entrada:
```json=
{
    "email": "teste@teste.com",
    "senha": "teste"
}
```

Retorno:
```json=
  statusCode: 200
  user, id, data_criacao, data_atualizacao, ultimo_login, token

  statusCode: 401
  "Usuário e/ou senha inválidos" (senha incorreta)

  statusCode: 404
  "Usuário e/ou senha inválidos" (usuário não encontrado)

  statusCode: 500
  "erro do servidor"
```
- **GET** /buscar/:id 
(:id = id do usuário)

Headers:
```json=
  Authorization = "Bearer {token}" (token retornado no signup e signin)
```
Retorno:
```json=
  statusCode: 200
  user

  statusCode: 403
  "Não autorizado" (ultimo_login há mais de 30 minutos ou token inexistente)

  statusCode: 401
  "Sessão inválida"

  statusCode: 404
  "Usuário não encontrado"

  statusCode: 500
  "erro do servidor"
```
