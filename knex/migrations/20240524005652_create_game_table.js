/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("game", (table) => {
    table.increments("id");
    table.string("title").notNullable();
    table.string("imagesrc").notNullable();
    table.integer("year", 4).notNullable();
    table.specificType("genre", "TEXT[]").notNullable();
    table.specificType("themes", "TEXT[]").notNullable();
    table.specificType("console", "TEXT[]").notNullable();
    table.specificType("developer", "TEXT[]").notNullable();
    table.specificType("publisher", "TEXT[]").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("game");
};
