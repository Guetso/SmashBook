const {
  Podium,
  Stock,
  Player,
  Participation,
  Match,
  Session,
} = require('../models')
const Sequelize = require('sequelize')
const podium = require('../models/podium')

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
        return podium
      })
    })
    Promise.all(createPodium)
      .then((podium) => {
        next()
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          message: "Erreur lors de l'enregistrement du podium !",
          error,
        })
      })
  }
}

exports.newStocks = (req, res, next) => {
  // check if the total of stocks given by a player is not over total stock for a player
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
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Erreur lors de la recherche du match à mettre à jour',
      })
    })
}

exports.getMatchesResults = (req, res, next) => {
  const offset = (Number(req.params.page) - 1) * Number(req.params.itemPerPages)
  const limit = Number(req.params.itemPerPages)
  const matches = Match.findAndCountAll({
    where: {
      isOver: true,
    },
    attributes: { exclude: ['session_id', 'sessionId', 'created_by'] },
    order: [
      ['createdAt', 'DESC'],
      [Participation, Podium, 'place', 'ASC'],
    ],
    include: [
      {
        model: Player,
        required: true,
        as: 'creator',
        attributes: { exclude: ['password'] },
      },
      {
        model: Participation,
        required: true, //true INNER JOIN, false LEFT OUTER JOIN - default LEFT OUTER JOIN
        include: [{ model: Stock }, { model: Podium }],
      },
      {
        model: Session,
        required: true,
      },
    ],
    distinct: true,
    limit: limit,
    offset: offset,
  })
    .then((matches) => {
      res.status(200).json({ matches })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Erreur dans la récupération des résultats du match',
        error,
      })
    })
}

exports.getSessionsResults = (req, res, next) => {
  const offset = Number(req.params.page - 1) * Number(req.params.itemPerPages)
  const limit = Number(req.params.itemPerPages)
  const sessions = Session.findAndCountAll({
    order: [['createdAt', 'DESC']],
    distinct: true,
    include: [
      {
        model: Match,
        duplicating: false,
        separate: true,
        required: true,
        where: {
          isOver: true,
        },
        attributes: {
          exclude: ['sessionId'],
        },
        include: [
          {
            model: Player,
            required: true,
            as: 'creator',
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt'],
            },
          },
          {
            model: Participation,
            required: true, //true INNER JOIN, false LEFT OUTER JOIN - default LEFT OUTER JOIN
            attributes: ['id', 'player_id', 'character_id'],
            include: [
              {
                model: Stock,
                required: true,
                attributes: {
                  exclude: ['createdAt', 'updatedAt'],
                },
              },
              {
                model: Podium,
                required: true,
                attributes: {
                  exclude: ['createdAt', 'updatedAt'],
                },
              },
            ],
          },
        ],
      },
    ],
    offset: offset,
    limit: limit,
  })
    .then((response) => {
      const sessions = JSON.parse(JSON.stringify(response))
      sessions.rows.forEach((session) => {
        session.matchesCount = session.matches.length

        const playersId = []
        const playersResults = []
        let participantCount = 0

        session.matches.forEach((match) => {
          if (match.participations.length > participantCount) {
            participantCount = match.participations.length
          }
        })

        session.matches.forEach((match) => {
          match.participations.forEach((participant) => {
            if (!playersId.includes(participant.player_id)) {
              playersId.push(participant.player_id)

              let playerResults = new Object()
              playerResults.id = participant.player_id
              playerResults.podiums = {}
              playerResults.stocksCount = 0
              playerResults.suicidesCount = 0

              for (let i = 1; i <= participantCount; i++) {
                playerResults.podiums[`${i}`] = 0
              }

              const places = Object.keys(playerResults.podiums)
              const placeToUp = places.find(
                (place) => parseInt(place) === participant.podia[0].place
              )
              playerResults.podiums[`${placeToUp}`] += 1

              participant.stocks.forEach((stock) => {
                if (stock.from_participation_id !== stock.to_participation_id) {
                  playerResults.stocksCount += stock.stock
                }
                if (stock.from_participation_id === stock.to_participation_id) {
                  playerResults.suicidesCount += stock.stock
                }
              })

              playersResults.push(playerResults)
            } else {
              const index = playersResults.findIndex(
                (playerResults) => playerResults.id === participant.player_id
              )

              const places = Object.keys(playersResults[index].podiums)
              const placeToUp = places.find(
                (place) => parseInt(place) === participant.podia[0].place
              )
              playersResults[index].podiums[`${placeToUp}`] += 1

              participant.stocks.forEach((stock) => {
                if (stock.from_participation_id !== stock.to_participation_id) {
                  playersResults[index].stocksCount += stock.stock
                }
                if (stock.from_participation_id === stock.to_participation_id) {
                  playersResults[index].suicidesCount += stock.stock
                }
              })
            }
          })
        })
        session.playersId = playersId
        session.playersResults = playersResults
      })
      res.status(200).json({ sessions })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: 'Erreur dans la récupération des résultats des sessions',
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

exports.deletePodium = (participation_id) => {
  Podium.destroy({
    where: {
      participation_id: participation_id,
    },
  })
}
