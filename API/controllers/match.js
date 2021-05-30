const { Match, Participation } = require('../models')
const Sequelize = require('sequelize')

exports.newMatch = (req, res, next) => {
  if (req.body.participants.length < 2) {
    res.status(500).json({ message: 'Deux joueurs minimum sont requis' })
  }
  Match.create({
    players: req.body.participants.length,
    stocks: req.body.stocks,
    createdBy: req.headers.playerid,
  })
    .then((match) => {
      const matchData = match
      let participationsList = req.body.participants.map((participant) => {
        return Participation.create({
          player_id: participant.player.id,
          character_id: participant.character,
          match_id: match.id,
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
          matchData.dataValues.participations = participationsList
         console.log(matchData)
          res
            .status(201)
            .json({ message: 'Match créé', matchData, participationsList })
        })
        .catch((error) => {
          res.status(500).json({
            message: 'Erreur lors de la création des participants',
            error,
          })
        })
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'Erreur lors de la création du match', error })
    })
}

exports.deleteMatch = (req, res, next) => {
  Match.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ message: 'Match supprimé !' })
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
}

exports.getInProgress = (req, res, next) => {
  const inProgessMatchs = Match.findAll({
    where: {
      isOver: false,
    },
    order: [['createdAt', 'DESC']],
    include: Participation,
  })
    .then((inProgessMatchs) => {
      res.status(200).json({ inProgessMatchs })
    })
    .catch((error) => {
      res
        .status(404)
        .json({ message: 'Impossible de récupérer les matchs en cours', error })
    })
}
