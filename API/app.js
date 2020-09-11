const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

// DEPENDENCIES

const { Player, Character, Participant } = require('./sequelize')

// Create a player

app.post('/api/players', (req, res) => {
  Player.create(req.body)
    .then((player) =>
      res.status(200).json({
        message: `Le joueur ${player.name} a bien été créé !`
      })
    )
    .catch((error) => {
      res.status(400).json({
        error
      })
    })
})

// Create a character

app.post('/api/characters', (req, res) => {
  Character.create(req.body)
    .then((character) =>
      res.status(201).json({
        message: `Le personnage ${character.name} a bien été créé !`
      })
    )
    .catch((error) => {
      console.log('rr')
      res.status(400).json({
        error
      })
    })
})

// Find or create a participant

app.get('/api/participants', (req, res) => {
  Participant.findOrCreate({
    where: { playerId: req.body.playerId, characterId: req.body.characterId }
  })
    .then((character) =>
      res.status(201).json({
        message: `Le participant a bien été inscrit !`
      })
    )
    .catch((error) => {
      const errorMessage = null
      res.status(400).json({
        message: `Echec d'inscription du participant: `
      })
    })
})

// Get all players

app.get('/api/players', (req, res) => {
  Player.findAll().then((players) => res.json(players))
})

module.exports = app
