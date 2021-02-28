const { Character } = require('../models')
const fs = require('fs')

exports.getAllCharacters = (req, res, next) => {
  const characters = Character.findAll()
    .then((characters) => {
      res.status(200).json({ characters })
    })
    .catch((error) => {
      console.log(error)
      res.status(400).json({ message: 'Impossible de récupérer les personnages', error })
    })
}

exports.getOneCharacter = (req, res, next) => {
  const characters = Character.findOne({ where: { id: req.params.id } })
    .then((character) => {
      res.status(200).json({ character })
    })
    .catch((error) => {
      console.log(error)
      res.status(404).json({ message: 'Impossible de récupérer le personnage', error })
    })
}

exports.add = (req, res, next) => {
  const characterObject = req.body
  const character = new Character({
    ...characterObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  })
  Character.create({
    name: character.name,
    gameId: character.gameId,
    imageUrl: character.imageUrl,
  })
    .then((character) =>
      res.status(201).json({
        message: `Le personnage ${character.name} a bien été créé !`,
      })
    )
    .catch((error) => {
      console.log('Erreur lors de la création du personnage')
      res.status(400).json({
        error,
      })
    })
}
