const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

// API ENDPOINTS

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})

// DEPENDENCIES

const { Player, Character } = require('./sequelize')

// Create a player

app.post('/api/players', (req, res) => {
  Player.create(req.body).then((player) => res.json(player))
})

// Get all players

app.get('/api/players', (req, res) => {
  Player.findAll().then((players) => res.json(players))
})

// Find or create a participant

app.get('/api/participants', (req, res) => {
  const body = req.body
})

module.exports = app