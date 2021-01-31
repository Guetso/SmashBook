const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { Player } = require('../models')
const player = require('../models/player')

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const playerObject = req.body
      const player = new Player({
        ...playerObject,
        imageUrl: req.file
          ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          : null
      })
      Player.create({
        name: player.name,
        email: player.email,
        imageUrl: player.imageUrl,
        password: hash
      })
        .then((player) => next())
        .catch((error) => {
          if (error.errors[0].message === 'players.name must be unique') {
            res.status(400).json({
              message: 'Ce pseudo est déjà pris, déso'
            })
          }
          if (error.errors[0].message === 'players.email must be unique') {
            res.status(400).json({
              message: 'Ce mail est déjà pris, déso'
            })
          } else {
            res.status(500).json({
              error
            })
          }
        })
    })
    .catch((error) => {
      console.log(error)
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
        res.status(401).json({ message: 'Utilisateur non trouvé !' })
      } else {
        bcrypt
          .compare(req.body.password, player.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ message: 'Mot de passe incorrect !' })
            } else {
              res.status(200).json({
                player: {
                  playerId: player.id,
                  name: player.name,
                  email: player.email,
                  bio: player.bio,
                  isAdmin: player.isAdmin,
                  imageUrl: player.imageUrl
                },
                token: jwt.sign(
                  { playerId: player.id, isAdmin: player.isAdmin },
                  process.env.ACCESS_TOKEN_SECRET,
                  {
                    expiresIn: '24h'
                  }
                )
              })
            }
          })
          .catch((error) => {
            res.status(500).json({ messsage: 'Mot de passe incorrect', error })
          })
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Erreur dans la requête', error })
    })
}

exports.switchAdmin = (req, res, next) => {
  Player.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((player) => {
      if (!player.isAdmin) {
        Player.update(
          { isAdmin: true },
          {
            where: {
              id: player.id
            }
          }
        )
          .then((response) => {
            console.log(response)
            res
              .status(200)
              .json({ message: `${player.name} est maintenant Admin` })
          })
          .catch((error) => {
            res.status(500).json({
              error
            })
          })
      }
      if (player.isAdmin) {
        Player.update(
          { isAdmin: false },
          {
            where: {
              id: player.id
            }
          }
        )
          .then((response) => {
            res.status(200).json({ message: `${player.name} n'est plus Admin` })
          })
          .catch((error) => {
            res.status(500).json({
              error
            })
          })
      }
    })
    .catch((error) => {
      res.status(500).json({
        error
      })
    })
}
