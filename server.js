require("dotenv").config();
const express = require("express");
const knex = require("./knex/knex.js");
const cors = require("cors");
const { toDate, isValid, isFuture, format } = require("date-fns");
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());

app
  .get("/api/v1/game", async (req, res) => {
    try {
      const game = await knex("game");
      res.json(game);
    } catch (err) {
      res.status(500).json({ message: "Error getting game!" });
    }
  })
  .post("/api/v1/game", async (req, res) => {
    const newGame = req.body;

    for (const requiredParam of [
      ["title", "string"],
      ["imagesrc", "string"],
      ["year", "number"],
      ["genre", "object"],
      ["themes", "object"],
      ["console", "object"],
      ["developer", "object"],
      ["publisher", "object"],
    ]) {
      const [param, type] = requiredParam;
      if (!newGame[param]) {
        return res.status(422).json({
          message: `Please add all relevant information! Missing ${param}`,
        });
      } else if (typeof newGame[param] !== type) {
        return res.status(422).json({
          message: `${param} param is ${typeof newGame[param]}! Use ${type}`,
        });
      }
    }

    try {
      const [id] = await knex("game").insert(newGame).returning("id");
      res.status(201).json({ id });
    } catch (err) {
      res.status(500).json({ message: "Error adding game!" });
    }
  });

app.get("/api/v1/game/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const game = await knex("game").where("id", parseInt(id));

    if (!game.length) {
      return res.json({ message: `Could not find game with ${id}` });
    }

    res.json(game);
  } catch (err) {
    res.status(500).json({ message: "Error getting game!" });
  }
});

app.get("/api/v1/challenge/:date", async (req, res) => {
  try {
    const challengeDate = toDate(req.params.date);
    if (!isValid(challengeDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    if (isFuture(challengeDate)) {
      return res.status(400).json({ message: "This is in the future" });
    }

    let challengeGame = await knex("game")
      .select("*")
      .join("challenge", "challenge.challenge_game_id", "=", "game.game_id")
      .where("challenge_date", challengeDate);
    if (challengeGame.length) return res.json(challengeGame[0]);

    // generate challenge
    await knex("challenge").insert({
      challenge_date: format(challengeDate, "yyyy-MM-dd"),
      challenge_game_id: knex("game")
        .select("game_id")
        .orderByRaw("random()")
        .limit(1),
    });

    challengeGame = await knex("game")
      .select("*")
      .join("challenge", "challenge.challenge_game_id", "=", "game.game_id")
      .where("challenge_date", challengeDate);
    if (challengeGame.length) return res.json(challengeGame[0]);
    else return res.status(500).json({ message: "Something bad happened" });
  } catch (err) {
    res.status(500).json({ message: "Some error occurred fetching challenge" });
  }
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
  console.log(`Running in ${process.env.NODE_ENV} environment`);
});
