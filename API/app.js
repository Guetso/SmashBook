require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const playerRoutes = require('./routes/player')
const characterRoutes = require('./routes/character')
const matchRoutes = require('./routes/match')
const resultRoutes = require('./routes/result')
const sessionRoutes = require('./routes/session')

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // On donne l'accès à toute origine '*'
  res.setHeader(
    'Access-Control-Allow-Headers', // On donne l'autorisation d'utiliser ces headers sur l'objet réponse
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, playerid'
  )
  res.setHeader(
    'Access-Control-Allow-Methods', // On donne l'autorisation d'utiliser ces actions aux réponses
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(
  '/images',
  express.static(path.join(__dirname, 'images/charactersHead'))
)

app.use('/players', playerRoutes)
app.use('/characters', characterRoutes)
app.use('/matches', matchRoutes)
app.use('/results', resultRoutes)
app.use('/sessions', sessionRoutes)

module.exports = app
