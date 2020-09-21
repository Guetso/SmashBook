const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/auth.config')
const { Player } = require('../models')
const player = require('../models/player')

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      Player.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      })
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
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
}

exports.login = (req, res, next) => {
  Player.findOne({
    where: {
      name: req.body.name
    }
  })
    .then((player) => {
      if (player === null) {
        res.status(401).json({ error: 'Utilisateur non trouvé !' })
      } else {
        bcrypt
          .compare(req.body.password, player.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' })
            } else {
              res.status(200).json({
                playerId: player.id,
                token: jwt.sign({ playerId: player.id, isAdmin:player.isAdmin }, jwtConfig.secret, {
                  expiresIn: '24h'
                })
              })
            }
          })
          .catch((error) => {
            res.status(500).json({messsage:'Erreur Mdp', error })
          })
      }
    })
    .catch((error) => {
      res.status(500).json({ message:'Erreur dans la requête', error })
    })
}
