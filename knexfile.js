// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.PG_HOST || "127.0.0.1",
      port: process.env.PG_PORT || 5432,
      database: process.env.PG_DATABASE || "kojin",
      user: process.env.PG_USER || "postgres",
      password: process.env.PG_PASSWORD || "",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/knex/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: __dirname + "/knex/seeds",
      tableName: "knex_seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/knex/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: __dirname + "/knex/seeds",
      tableName: "knex_seeds",
    },
  },
};
