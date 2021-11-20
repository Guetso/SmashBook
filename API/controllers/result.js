const { Podium, Stock, Player, Participation, Match } = require('../models')
const Sequelize = require('sequelize')

exports.newPodium = (req, res, next) => {
  function checkIfArrayIsUnique(myArray) {
    return myArray.length === new Set(myArray).size
  }

  if (!checkIfArrayIsUnique(req.body.podium.map((a) => a.participation_id))) {
    res.status(500).json({
      message: 'Un participant est présent plusieurs fois !',
    })
  } else {
    let createPodium = req.body.podium.map((participant) => {
      return Podium.create({
        participation_id: participant.participation_id,
        place: participant.place,
      }).then((podium) => {
        console.log('aaa', podium)
        return podium
      })
    })
    Promise.all(createPodium)
      .then((podium) => {
        next()
      })
      .catch((error) => {
        console.log('catch', error)
        res.status(500).json({
          message: "Erreur lors de l'enregistrement du podium !",
          error,
        })
      })
  }
}

exports.newStocks = (req, res, next) => {
  // check if the total of stocks given by a player is not over total stock for a player
  console.log('rrr', req.body.podium)
  const podiumParticipation_id = req.body.podium
  let matchStocks = null
  const matchId = req.body.matchId
  Match.findOne({
    where: {
      id: matchId,
    },
  })
    .then((match) => {
      matchStocks = match.dataValues.stocks
      const holder = {}
      req.body.stocks.forEach((stock) => {
        if (holder.hasOwnProperty(stock.to_id)) {
          holder[stock.to_id] = holder[stock.to_id] + stock.stocks
        } else {
          holder[stock.to_id] = stock.stocks
        }
      })

      let stocksAreValid = true

      for (const obj in holder) {
        if (holder[obj] > matchStocks) {
          podiumParticipation_id.forEach((participation) => {
            this.deletePodium(participation.participation_id)
          })
          stocksAreValid = false
          break
        }
      }

      if (stocksAreValid) {
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
      } else {
        res.status(500).json({
          message:
            'Le nombre de vie prisent à un joueur ne peut dépasser le total de vie par joueur',
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: 'Erreur lors de la recherche du match à mettre à jour',
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

exports.deletePodium = (participation_id) => {
  Podium.destroy({
    where: {
      participation_id: participation_id,
    },
  })
}
