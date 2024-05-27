const express = require("express");
const knex = require("./knex/knex.js");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());

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
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Please add all relevant information!" });
    }

    try {
      const [id] = await knex("game")
        .insert({
          ...req.body,
        })
        .returning("id");
      res.status(201).json({ id });
    } catch (err) {
      res.status(500).json({ message: "Error adding game!" });
    }
    //res.send(req.body)
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
});
