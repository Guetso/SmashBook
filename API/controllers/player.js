const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Player } = require('../models')

exports.signup = (req, res, next) => {
  Player.create(req.body)
    .then((player) =>
      res.status(200).json({
        message: `Le joueur ${player.name} a bien été créé !`
      })
    )
    .catch((error) => {
      res.status(500).json({
        error
      })
    })
}
