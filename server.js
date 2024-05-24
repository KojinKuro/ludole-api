const express = require('express');
const PORT = process.env.PORT || 8000;
const knex = require('./knex/knex.js');
const app = express();

app.use(express.json());

app.get('/api/v1/game', async (req, res) => {
  try{
    const game = await knex('game');
    res.json(game)
  }catch (err) {
    res.status(500).json({message: "Error getting game!"})
  }
  // res.send("getting all games")
})
app.post('/api/v1/game', async (req, res)=> {
  const {title, imagesrc, year, genre, themes,console,developer,publisher} = req.body;

  if (!title || !imagesrc || !year || !genre ||!themes || !console || !developer || !publisher) {
    return res.status(400).json({message:"Please add all relevant information!"})
  }
  
  try {
    const [id] = await knex('game').insert({title, imagesrc, year, genre, themes,console,developer,publisher}).returning('id');
    res.status(201).json({id});
  } catch (err) {
    res.status(500).json({message: "Error adding game!"})
  }
  //res.send(req.body)
})


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});