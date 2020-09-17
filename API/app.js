const express = require('express')
const bodyParser = require('body-parser')

const playerRoutes = require('./routes/player')
const characterRoutes = require('./routes/character')
const matchRoutes = require('./routes/match')
const resultRoutes = require('./routes/result')

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // On donne l'accès à toute origine '*'
  res.setHeader(
    'Access-Control-Allow-Headers', // On donne l'autorisation d'utiliser ces headers sur l'objet réponse
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods', // On donne l'autorisation d'utiliser ces actions aux réponses
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.use(bodyParser.json())

app.use('/api/players', playerRoutes)
app.use('/api/characters', characterRoutes)
app.use('/api/matches', matchRoutes)
app.use('/api/results', resultRoutes)

/* // DEPENDENCIES

const { Player, Character, Participant } = require('./models')

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
}) */

module.exports = app
