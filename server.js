require("dotenv").config();
const express = require("express");
const knex = require("./knex/knex.js");
const cors = require('cors');
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

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
  console.log(`Running in ${process.env.ENVIRONMENT} environment`);
});
