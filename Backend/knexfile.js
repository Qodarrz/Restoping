/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "shuttle.proxy.rlwy.net",
      port: 26922,
      user: "root",
      password: "AkQCLNuIDsnhfxVNnbkWUfnhFgvuRRre",
      database: "railway",
    },
    migrations: {
      directory: "./src/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  // development: {
  //   client: "mysql2",
  //   connection: {
  //     host: "localhost",
  //     port: 3306,
  //     user: "root",
  //     password: "",
  //     database: "resto",
  //   },
  //   migrations: {
  //     directory: "./migrations",
  //     tableName: "knex_migrations",
  //   },
  //   seeds: {
  //     directory: "./seeds",
  //   },
  // },

  // production: {
  //   client: "mysql2",
  //   connection: {
  //     host: "your-production-host",
  //     user: "your-production-user",
  //     password: "your-production-password",
  //     database: "resto",
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     directory: "./migrations",
  //     tableName: "knex_migrations",
  //   },
  //   seeds: {
  //     directory: "./seeds",
  //   },
  // },
};
