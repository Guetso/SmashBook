const { Participant } = require('../models')

exports.createParticipant = (req, res, next) => {
  Participant.findOrCreate({
    where: { playerId: req.body.playerId, characterId: req.body.characterId }
  })
    .then(([character, created]) => {
      res.status(201).json({
        message: `Le participant a bien été inscrit !`
      })
    })
    .catch((error) => {
      const errorMessage = null
      res.status(400).json({
        message: `Echec d'inscription du participant ! `
      })
    })
}
