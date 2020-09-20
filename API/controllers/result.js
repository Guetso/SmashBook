const { Podium } = require('../models')
const { Stock } = require('../models')
const { MatchParticipant } = require('../models')

exports.save = (req, res, next) => {
  Podium.create(req.body.podium)
    .then((podium) => {
      MatchParticipant.findAll({
        where: { matchId: req.body.podium.matchId }
      }).then((matchParticipantList) => {
        req.body.stocks.forEach((matchParticipant) => {
          Stock.create({
            matchParticipantId: matchParticipant.matchParticipant,
            player_1: matchParticipant.player_1,
            player_2: matchParticipant.player_2,
            player_3: matchParticipant.player_3,
            player_4: matchParticipant.player_4,
            player_5: matchParticipant.player_5,
            player_6: matchParticipant.player_6,
            player_7: matchParticipant.player_7,
            player_8: matchParticipant.player_8
          })
        })
      }).then(()=>{res.status(201).json({message: 'Résultats enregistrés !'})})
    })
    .catch((error) => {
      console.log("Erreur dans l'enregistrement du podium")
      res.status(400).json({
        message: "Erreur dans l'enregistrement du podium",
        error
      })
    })
}
