const { Match } = require('../models')
const { Participant } = require('../models')
const match = require('../models/match')

exports.newMatch = (req, res, next) => {
  Match.create(req.body)
    .then((match) => {
      res.status(201).json({
        message: `Le match a bien été créé !`
      })
      return match
    })
    .then((match) => {
      req.body.participantsId.forEach((participant) => {
        Participant.findByPk(participant).then((participant) => {
          match.addParticipant(participant)
        })
      })
    })
    .catch((error) => {
      console.log('rr')
      res.status(400).json({
        error
      })
    })
}
