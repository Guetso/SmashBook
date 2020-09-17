const { Podium } = require('../models')

exports.save = (req, res, next) => {
  console.log(Podium)
  Podium.create(req.body)
    .then(() => {
      res.status(201).json({
        message: `Le podium a bien été enregistré !`
      })
    })
    .catch((error) => {
      console.log('Erreur dans l\'enregistrement du podium')
      res.status(400).json({
        message: 'Erreur dans l\'enregistrement du podium',
        error
      })
    })
}
