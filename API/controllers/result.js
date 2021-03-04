const { Podium, Stock, Player, Participation } = require('../models')
const Sequelize = require('sequelize')

exports.newResult = (req, res, next) => {
  let createPodium = req.body.podium.map((participant) => {
    return Podium.create({
      participation_id: participant.participation_id,
      place: participant.place,
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
        error,
      })
    })
}

exports.newStocks = (req, res, next) => {
  let createStocks = req.body.stocks.map((stock) => {
    return Stock.create({
      from_participation_id: stock.from_id,
      to_participation_id: stock.to_id,
      stock: stock.stocks,
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
        error,
      })
    })
}

exports.getAllPlayerStock = (req, res, next) => {
  Player.findAll({
    attributes: [
      'id',
      [
        Sequelize.fn('SUM', Sequelize.col('participations->stocks.stock')),
        'totalStocks',
      ],
    ],
    group: ['player.id'],
    include: [
      {
        model: Participation,
        required: true, //true INNER JOIN, false LEFT OUTER JOIN - default LEFT OUTER JOIN
        attributes: [],
        include: [
          {
            model: Stock,
            required: true,
            where: {
              from_participation_id: {
                [Sequelize.Op.ne]: Sequelize.col('to_participation_id'),
              },
            },
            attributes: [],
          },
        ],
      },
    ],
  })
    .then((stock) => {
      res.status(200).json({ stock })
    })
    .catch((error) => {
      console.log(error)
      res
        .status(500)
        .json({ message: 'Erreur dans la récupération des stocks', error })
    })
}
