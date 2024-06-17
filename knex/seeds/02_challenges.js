const { subDays, format } = require("date-fns");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const challengeEntries = [];
  for (let i = 0; i < 30; ++i) {
    challengeEntries.push({
      challenge_date: format(subDays(Date.now(), i), "yyyy-MM-dd"),
      challenge_game_id: knex("game")
        .select("id")
        .orderByRaw("random()")
        .limit(1),
    });
  }

  await knex("challenge").insert(challengeEntries);
};
