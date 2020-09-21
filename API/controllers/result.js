const { Podium, Stock } = require('../models')

exports.newResult = (req, res, next) => {
  let createPodium = req.body.podium.map((participant) => {
    return Podium.create({
      participation_id: participant.participation_id,
      place: participant.place
    }).then((podium) => {
      return podium
    })
  })
  Promise.all(createPodium)
    .then(() => {
      next()
    })
    .catch((error) => {
      res.status(500).json({
        message: "Erreur lors de l'enregistrement du podium !",
        error
      })
    })
}

exports.newStocks = (req, res, next) => {
  let createStocks = req.body.stocks.map((stock) => {
    return Stock.create({
      from_participation_id: stock.from_id,
      to_participation_id: stock.to_id,
      stock: stock.stocks
    }).then((podium) => {
      return podium
    })
  })
  Promise.all(createStocks)
    .then(() => {
      res.status(201).json({ message: 'Résultats enregistrés !' })
    })
    .catch((error) => {
      res.status(500).json({
        message: "Erreur lors de l'enregistrement des stocks !",
        error
      })
    })
}
