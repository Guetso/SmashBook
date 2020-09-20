const { Podium, Stock } = require('../models')

exports.newResult = (req, res, next) => {
  req.body
    .forEach((participant) => {
      Podium.create({
        participation_id: participant.id,
        place: participant.place
      })
        .then(() => {
          participant.stocks.forEach((stockLine) => {
            Stock.create({
              from_participation_id: participant.id,
              to_participation_id: stockLine.player,
              stock: stockLine.stock
            })
              .then((stockLine) => {
                console.log('STOCKLINE', stockLine)
              })
              .catch((error) => {
                console.log('STOCKLINE', error)
              })
          })
        })
        .catch((error) => {
          console.log('PODIUM', error)
        })
    })
    .then(() => {
      res.status(201).json({ message: 'Resultats enregistrés !' })
    })
    .catch((error) => {
      res.status(500).json({
        message: "Erreur lors de l'enregistrement des résultats !",
        error
      })
    })
}
