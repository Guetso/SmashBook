const jwt = require('jsonwebtoken')

exports.adminAuth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw { error: 'Cette demande exige une authorisation' }
    }
    const whoSasking = req.headers.playerid
    const token = req.headers.authorization.split(' ')[1] // Récupération du token dans l'entête
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) // On vérifie le token avec la clé pour lire ce TOKEN
    const playerId = decodedToken.playerId // Le token devient un objet JS classique qu'on place dans une constante, et on y récupère l'user ID pour comparaison le cas échéant
    const isAdmin = decodedToken.isAdmin
    console.log(whoSasking, playerId)
    if (!whoSasking) {
      throw { error: 'Qui êtes vous ?' } // Vérifie si la requete contient un header "playerid"
    }
    if (whoSasking != playerId) {
      throw { error: "Vous n'êtes pas celui qui vous prétendez être !" } // Vérifie que le token correspond à "playerid"
    }
    if (!isAdmin) {
      throw { error: "Vous n'avez pas l'autorisation !" } // Vérifie que l'utilisateur est admin
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(401).json(error || { error: 'Requête non authentifiée !' })
  }
}

exports.auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw { error: 'Cette demande exige une authorisation' }
    }
    const whoSasking = req.headers.playerid
    const token = req.headers.authorization.split(' ')[1] // Récupération du token dans l'entête
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) // On vérifie le token avec la clé pour lire ce TOKEN
    const playerId = decodedToken.playerId // Le token devient un objet JS classique qu'on place dans une constante, et on y récupère l'user ID pour comparaison le cas échéant
    if (!whoSasking) {
      throw { error: 'Qui êtes vous ?' } // Vérifie si la requete contient un header "playerid"
    }
    if (whoSasking != playerId) {
      throw { error: "Vous n'êtes pas celui qui vous prétendez être !" } // Vérifie que le token correspond à "playerid"
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(401).json(error || { error: 'Requête non authentifiée !' })
  }
}
