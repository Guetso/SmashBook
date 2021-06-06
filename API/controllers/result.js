const { Podium, Stock, Player, Participation } = require('../models')
const Sequelize = require('sequelize')

exports.newPodium = (req, res, next) => {
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
      next()
    })
    .catch((error) => {
      res.status(500).json({
        message: "Erreur lors de l'enregistrement des stocks !",
        error,
      })
    })
}

exports.getAllPlayerStocks = (req, res, next) => {
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

exports.getOnePlayerStocks = (req, res, next) => {
  Player.findOne({
    where: { id: req.params.id },
  })
    .then((player) => {
      if (!player) {
        console.log("Ce joueur n'existe pas")
        res.status(404).json({ message: "Ce joueur n'existe pas" })
      }
      Player.findAll({
        attributes: [
          'id',
          [
            Sequelize.fn('SUM', Sequelize.col('participations->stocks.stock')),
            'totalStocks',
          ],
        ],
        where: {
          id: req.params.id,
        },
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
        .then((stocksData) => {
          // On corrige le fait que si le joueur n'a jamais été pris de stock, SQL nous enverra un id = null
          let stocks
          if (stocksData[0].dataValues.id === null) {
            stocksData[0].dataValues.id = req.params.id
          }
          if (stocksData[0].dataValues.totalStocks === null) {
            stocksData[0].dataValues.totalStocks = 0
          }
          stocks = stocksData
          res.locals.stocks = stocks // On passe la data au prochain middleware
          next()
        })
        .catch((error) => {
          console.log(error)
          res
            .status(500)
            .json({ message: 'Erreur dans la récupération des stocks', error })
        })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Erreur dans la récupération des résultat du joueur',
        error,
      })
    })
}

exports.getOnePlayerPodium1 = (req, res, next) => {
  Player.findAll({
    attributes: [
      'id',
      [
        Sequelize.fn('COUNT', Sequelize.col('participations->podia.place')),
        'firstPlace',
      ],
    ],
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Participation,
        required: true, //true INNER JOIN, false LEFT OUTER JOIN - default LEFT OUTER JOIN
        attributes: [],
        include: [
          {
            model: Podium,
            required: true,
            where: {
              place: 1,
            },
            attributes: [],
          },
        ],
      },
    ],
  })
    .then((podiumData) => {
      // On corrige le fait que si le joueur n'a jamais été en 1er place, SQL nous enverra un id = null
      let podium
      if (podiumData[0].dataValues.id === null) {
        podiumData[0].dataValues.id = req.params.id
      }
      podium = podiumData
      const stocks = res.locals.stocks
      const results = { stocks, podium }
      res.locals.podAndStocks = results
      next()
    })
    .catch((error) => {
      console.log(error)
      res
        .status(500)
        .json({ message: 'Erreur dans la récupération des podiums', error })
    })
}

exports.getOneParticipations = (req, res, next) => {
  Participation.findAll({
    attributes: [
      ['player_id', 'id'], // 'player_id' as 'id'
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'participations'],
    ],
    where: {
      player_id: req.params.id,
    },
  })
    .then((participationsData) => {
      let participations
      if (participationsData[0].dataValues.id === null) {
        participationsData[0].dataValues.id = req.params.id
      }
      participations = participationsData
      const podAndStocks = res.locals.podAndStocks
      const results = { ...podAndStocks, participations }
      res.status(200).json({ results })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Erreur dans la récupération des participations',
        error,
      })
    })
}
