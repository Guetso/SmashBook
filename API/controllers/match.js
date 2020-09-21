const { Match, Participation } = require('../models')

exports.newMatch = (req, res, next) => {
  Match.create({
    players: req.body.participants.length,
    stocks: req.body.stocks
  })
    .then((match) => {
      let participationsList = req.body.participants.map((participant) => {
        return Participation.create({
          player_id: participant.player,
          character_id: participant.character,
          match_id: match.id
        })
          .then((participation) => {
            return participation
          })
          .catch((error) => {
            console.log(error)
            throw error
          })
      })
      Promise.all(participationsList)
        .then((participationsList) => {
          res.status(201).json({ message: 'Match créé', participationsList })
        })
        .catch((error) => {
          res.status(500).json({
            message: 'Erreur lors de la création des participants',
            error
          })
        })
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'Erreur lors de la création du match', error })
    })
}
