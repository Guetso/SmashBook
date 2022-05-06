const { Session } = require('../models')
const Sequelize = require('sequelize')
const moment = require('moment')

exports.newSession = (req, res, next) => {
  const sessionDate = moment().format('YYYY-MM-DD')
  Session.findOne({
    where: { date: sessionDate },
  }).then((session) => {
    if (!session) {
      Session.create({
        date: sessionDate,
      }).then((session) => {
        req.sessionValue = session
        next()
      })
    } else {
      req.sessionValue = session
      next()
    }
  })
}

exports.getOne = (req, res, next) => {
  Session.findOne({
    where: { id: req.params.id },
  })
    .then((session) => {
      res.status(200).json({ session })
    })
    .catch((error) => {
      res.status(401).json({ message: 'Session introuvable', error })
    })
}
