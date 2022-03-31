# Products Scrap

Esta API tem como funcionalidade a busca por informações de produtos publicados em sites de varejo, utilizando o conceito de web scrapping

---

## Autor

- Gabriel Morcatti - gabriel.morcatti@yahoo.com.br

## Tecnologias Utilizadas

- NodeJs
- Express Framework
- Typescript
- PostgreSQL
- Docker
- Docker-Compose
- Jest

## Rotas

A API conta, atualmente, com somente um rota

| Metodo | Endpoint        |
| :----- | :-------------- |
| `GET`  | `/scrap/?{url}` |

Que tem como parâmetro:
| Parâmetro | Tipo | Obrigatório | Descrição |
| :---------- | :------------ | :---------- | :---------------- |
| `url` | `Query Param` | `Sim` | `A url do Produto`|

### Sites que podem ser utilizados

Atualmente, a API consegue fazer o scrap das informações dos produtos dos seguintes sites:

- [Amazon](http://amazon.com.br/)
- [Americanas](https://www.americanas.com.br/)
- [Submarino](https://www.submarino.com.br/)

## Pré-requisitos

- NodeJs instalado
- Docker e Docker-compose instalados
- Parametrização de todo arquivo "example.env" e transforma-lo em um ".env"

### .ENV

As variáveis de ambiente deste projeto são:

```env
PG_USER = Nome de usuário do Postgres. Ex: "postgres"
PG_PASS = Senha de usuário do Postgres. Ex: "123456"
PG_HOST = Nome do Host do Postgres para iniciar a API. Neste caso é o mesmo nome do container criado no docker-compose.yml, que é: "postgres_db"
```

## Requisitos

- [x] Receber uma URL de produto como entrada e devolver um JSON como saída.
- [x] Os dados dos produtos devem ser persistidos em um banco de dados
- [x] Se uma URL for enviada mais de uma vez e o tempo for inferior a 1h, a resposta deve vir do banco de dados, caso contrário, os dados devem ser coletados novamente
- [x] Foi criado um cache in memory, para não ser necessário ir diretamente no banco de dados sempre que o produto for consultado dentro de 1h.

## Instalação e Inicialização

### Parametrização

- Siga todos os passos da seção "Pré-requisitos"

### Iniciando containers a partir do docker-compose

Abra o terminal na raiz do projeto e digite o seguinte comando:

```bash
docker-compose up
```

Ele irá iniciar os containers do Postgres e da API, além de rodas a API na porta 3000.

## Erros ocasionais

- "Could not find expected browser (chrome) locally":

Para resolver este erro será necessário executar um comando de instalação dentro do container. Para isso, siga os seguintes passos:

1. Busque e copie o ID do Container da aplicação (name: application).

```bash
docker ps
```

2. Acesse o container para execução do comando desejado.

```bash
docker exec -it {CONTAINER ID} bash
```

3. Dentro do Container, vá até a pasta do "puppeteer" dentro da "node_modules" e instale suas dependencias:

```bash
cd node_modules/puppeteer && npm install
```

4. Saia do container:

```bash
exit
```
