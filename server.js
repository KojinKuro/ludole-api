const express = require('express');
const PORT = process.env.PORT || 8000;
const knex = require('./knex/knex.js');
const app = express();

app.use(express.json())
app.get('/api/v1/game', (req, res) => {
 res.send("getting all games")
}).post('/api/v1/game', (req, res)=> {
    res.send(req.body)
})

app.get('/tasks', (req, res) => {
 
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});