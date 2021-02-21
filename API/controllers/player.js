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
          ? `${process.env.HOST}/images/${req.file.filename}`
          : null,
      })
      Player.create({
        name: player.name,
        email: player.email,
        imageUrl: player.imageUrl,
        password: hash,
      })
        .then((player) => next())
        .catch((error) => {
          if (error.errors[0].message === 'players.name must be unique') {
            res.status(400).json({
              message: 'Ce pseudo est déjà pris, déso',
            })
          }
          if (error.errors[0].message === 'players.email must be unique') {
            res.status(400).json({
              message: 'Ce mail est déjà pris, déso',
            })
          } else {
            res.status(500).json({
              error,
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
      name: req.body.name,
    },
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
                message: `${player.name} rejoint le combat !`,
                player: {
                  playerId: player.id,
                  name: player.name,
                  email: player.email,
                  bio: player.bio,
                  isAdmin: player.isAdmin,
                  imageUrl: player.imageUrl,
                  favChar: player.favChar,
                },
                token: jwt.sign(
                  { playerId: player.id, isAdmin: player.isAdmin },
                  process.env.ACCESS_TOKEN_SECRET,
                  {
                    expiresIn: '24h',
                  }
                ),
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
      id: req.params.id,
    },
  })
    .then((player) => {
      if (!player.isAdmin) {
        Player.update(
          { isAdmin: true },
          {
            where: {
              id: player.id,
            },
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
              error,
            })
          })
      }
      if (player.isAdmin) {
        Player.update(
          { isAdmin: false },
          {
            where: {
              id: player.id,
            },
          }
        )
          .then((response) => {
            res.status(200).json({ message: `${player.name} n'est plus Admin` })
          })
          .catch((error) => {
            res.status(500).json({
              error,
            })
          })
      }
    })
    .catch((error) => {
      res.status(500).json({
        error,
      })
    })
}

exports.modifyPlayer = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(async (hash) => {
      let playerObject = 0
      if (req.file) {
        // Si la modification contient une image
        await Player.findOne({ where: { id: req.params.id } }).then(
          (player) => {
            // On supprime l'ancienne image du serveur
            if (player.imageUrl) {
              const filename = player.imageUrl.split('/images/')[1]
              fs.unlinkSync(`images/${filename}`)
            }
          }
        )
        playerObject = {
          // On ajoute la nouvelle image
          ...req.body,
          password: hash,
          imageUrl: `${process.env.HOST}/images/${req.file.filename}`,
        }
      } else {
        // Si la modification ne contient pas de nouvelle image
        playerObject = { ...req.body, password: hash }
      }
      console.log(req.body)
      Player.update(
        // On applique les paramètre de playerObject
        { ...playerObject },
        { where: { id: req.params.id } }
      ).then(() => res.status(200).json({ message: 'Informations modifiée !' }))
    })

    .catch((error) => res.status(400).json({ error }))
}
