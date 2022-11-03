# Case - Agenda telefônica

## > Requisitos obrigatórios:
- Fazer uma agenda telefônica (em formato de lista);

- Na tela específica de contato deve conter campos de telefone, nome, email e imagem;

- DEVE ser possível cadastrar, atualizar, visualizar e apagar contatos da agenda;

- O projeto deve ser responsivo para as medidas de desktop e mobile;

- A aplicação DEVE ser feita em React com back em Nest.js e Banco de dados em SQL.



## > O que te ajuda a se sair bem:
- Usar context api do react; 

- Salvar a imagem no cloud ao em vez do local; 

- Boa qualidade de design;

- Boas práticas de programação;

- Integração bem feita do Front com o Back e o banco; 

- Montar um fluxo coerente de acesso as telas;

- Saber explicar bem o código que fez e o motivo pelo qual fez daquele jeito (Terá uma apresentação).


- Enviar o link do github até o dia 04/11 às 17h.

## Configuração do Banco de dados mysql com Docker

´´´bash
docker run --name Agenda -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=agenda -p 3306:3306 -d mysql:latest
´´´

e depois criar um arquivo dev.env na raiz do projeto com as seguintes variáveis:
```ini
HOST=localhost
PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DATABASE=agenda
```
dentro desse mesmo arquivo, adicionar a variáveis de ambiente relacionadas amazon s3:
```ini
AWS_ACCESS_KEY_ID=<SEU ACCESS KEY>
AWS_SECRET_ACCESS_KEY=<SEU ACCESS SECRET>
AWS_REGION=<SIGLA DA SUA REGIÃO>
AWS_S3_BUCKET=<BUCKET>
```


## Instalação

```bash
$ yarn install
```

## Rodando a aplicação

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Executando testes

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
