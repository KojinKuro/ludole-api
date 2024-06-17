/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("challenge").insert([
    {
      challenge_date: "2024-06-16",
      challenge_game_id: knex("game")
        .select("id")
        .orderByRaw("random()")
        .limit(1),
    },
    {
      challenge_date: "2024-06-17",
      challenge_game_id: knex("game")
        .select("id")
        .orderByRaw("random()")
        .limit(1),
    },
    {
      challenge_date: "2024-06-18",
      challenge_game_id: knex("game")
        .select("id")
        .orderByRaw("random()")
        .limit(1),
    },
    {
      challenge_date: "2024-06-19",
      challenge_game_id: knex("game")
        .select("id")
        .orderByRaw("random()")
        .limit(1),
    },
  ]);
};
