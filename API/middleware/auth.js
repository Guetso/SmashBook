const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/auth.config') // On récupère la clé pour le TOKEN

exports.adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // Récupération du token dans l'entête
    const decodedToken = jwt.verify(token, jwtConfig.secret) // On vérifie le token avec la clé pour lire ce TOKEN
    const playerId = decodedToken.playerId // Le token devient un objet JS classique qu'on place dans une constante, et on y récupère l'user ID pour comparaison le cas échéant
    const isAdmin = decodedToken.isAdmin
    if ((req.body.userId && req.body.userId !== playerId) || !isAdmin) {
      throw "Vous n'avez pas l'autorisation !"
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: error | 'Requête non authentifiée !' })
  }
}

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // Récupération du token dans l'entête
    const decodedToken = jwt.verify(token, jwtConfig.secret) // On vérifie le token avec la clé pour lire ce TOKEN
    const playerId = decodedToken.playerId // Le token devient un objet JS classique qu'on place dans une constante, et on y récupère l'user ID pour comparaison le cas échéant
    if (req.body.userId && req.body.userId !== playerId) {
      throw "Vous n'avez pas l'autorisation !"
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: error | 'Requête non authentifiée !' })
  }
}