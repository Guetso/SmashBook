const { Character } = require('../models')

exports.add = (req, res, next) => {
  Character.create(req.body)
    .then((character) =>
      res.status(201).json({
        message: `Le personnage ${character.name} a bien été créé !`
      })
    )
    .catch((error) => {
      console.log('Erreur l\'lors de la création du personnage')
      res.status(400).json({
        error
      })
    })
}
