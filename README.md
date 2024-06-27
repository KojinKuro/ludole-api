# Ludole API

This is the backend API server for [Ludole](https://github.com/KojinKuro/ludole) application. This project was created as part of a larger project to learn how to build a fullstack application. More information about this project can be found in the [front end repository here](https://github.com/KojinKuro/ludole).

![Node.js Badge](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=fff&style=for-the-badge)
![Express Badge](https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=for-the-badge)
![Nodemon Badge](https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=fff&style=for-the-badge)
![Knex.js Badge](https://img.shields.io/badge/Knex.js-D26B38?logo=knexdotjs&logoColor=fff&style=for-the-badge)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![.ENV Badge](https://img.shields.io/badge/.ENV-ECD53F?logo=dotenv&logoColor=000&style=for-the-badge)

## Demo

[ludole-api.vercel.app](https://ludole-api.vercel.app)

## How to Run Locally

To run this server, you must have a local deployment of Postgres running. While we will not go into detail on how to do this, you can check out https://postgresapp.com/

Clone the project

```bash
  git clone git@github.com:KojinKuro/ludole-api.git
```

Go to the project directory

```bash
  cd ludole-api
```

Install dependencies

```bash
  npm install
```

Configure your `.env` file.

Migrate the tables.

```bash
  npm run migrate
```

Seed the tables.

```bash
  npm run seed
```

Start the server

```bash
  npm run start
```

The server will be running at `localhost:8000`

## Environment Variables

To run this project, you will need to add the following environment variables to a `.env` file in the root directory. If you do not add these, our application will use the default values which probably won't match your local database.

`PG_HOST`

`PG_PORT`

`PG_DATABASE`

`PG_USER`

`PG_PASSWORD`

## API Reference

#### Get all games

```http
  GET /api/v1/game
```

#### Post a game

```http
  POST /api/v1/game
```

Body must include:

```json
{
    "title": <string>,
    "imagesrc": <string>,
    "year": <number>,
    "genre": <array of strings>,
    "themes": <array of strings>,
    "console": <array of strings>,
    "developer": <array of strings>,
    "publisher": <array of string>
}
```

## Authors

- Brandon Doza - [@BrandonDoza](https://github.com/BrandonDoza)
- Charles Kwang - [@KojinKuro](https://github.com/KojinKuro)
- Gwyneth Patrick - [@moth-dust](https://github.com/moth-dust)
- Lydia Sims - [@LISims88](https://github.com/LISims88)
