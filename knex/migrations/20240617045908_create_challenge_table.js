/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("challenge", (table) => {
    table.increments("challenge_id").unsigned().primary();
    table.date("challenge_date").unique().notNullable();
    table.integer("challenge_game_id").references("game_id").inTable("game");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("challenge");
};
