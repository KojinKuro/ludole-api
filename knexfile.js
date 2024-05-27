// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'lydiasims',
      user:     'postgres',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname + '/knex/seeds',
      tableName: 'knex_seeds'
    }
  }

};
