const { Match } = require('../models') // Pour accéder à la table match
const { Participant } = require('../models') // Pour accéder à la table participant
const participantController = require('../controllers/participant') // Pour récupérer la méthode qui vérifie et inscrit un participant dans la table participant

exports.newMatch = (req, res, next) => {
  participantController
    .createParticipants(req.body.participants) // on fourni à la méthode ".createParticipant", un tableau d'objet contenant les id du couple "joueur/personnage" souhaitant s'inscrire

    .then((participantsList) => {
      // une fois que la méthode nous renvoie la liste des participants "confirmés"
      Match.create({ stocks: req.body.stocks }) // On peut créer une instance du match, seule le paramètre du nombre de stock est à fournir par la requête

        .then((match) => {
          participantsList.forEach((participant) => {
            // On ajoute chaque participants confirmés au match
            Participant.findByPk(participant.id).then((participant) => {
              match
                .addParticipant(participant)
                .then((match) => {
                  return match
                })
                .catch((error) => {
                  console.log(
                    "Erreur dans l'inscription d'un participant: ",
                    error
                  )
                })
            })
          })
        })

        .then((match) => {
          res.status(201).json({
            message: 'Le match a bien été créé !',
            match, // infos du match
            participantsList // tableau des participants au match
          })
        })
        .catch((error) => {
          // Gestion des erreurs dans la création d'un match
          console.log(error)
          res.status(400).json({
            error
          })
        })
    })
    .catch((error) => {
      // Gestion des erreurs dans la récupération de la liste des participants confirmés
      console.log(
        'Erreur dans la récupération de la liste des participants: ',
        error
      )
      res.status(500).json({
        message: 'Erreur lors de la récupération de la liste des participants'
      })
    })
}

exports.closeMatch = (req, res, next) => {
  Match.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((match) => {
      if (match.closed) {
        res.status(400).json({
          message: 'Ce match est déjà terminé !'
        })
      } else {
        Match.update(
          {
            closed: true
          },
          {
            where: {
              id: match.id
            }
          }
        )
          .then(() => {
            res.status(200).json({
              message: 'Match terminé !'
            })
          })
          .catch((error) => {
            error
          })
      }
    })
    .catch((error) => {
      res.status(404).json({ message: 'Match inconnu' })
    })
}

exports.deleteMatch = (req, res, next) => {
  Match.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((match) => {
      if (match.closed) {
        Match.destroy({
          where: {
            id: match.id
          }
        }).then(() => {
          res.status(200).json({
            message: 'Match supprimé !'
          })
        })
      } else {
        Match.destroy({
          where: {
            id: match.id
          }
        }).then(() => {
          res.status(200).json({
            message: 'Match annulé !'
          })
        })
      }
    })
    .catch((error) => {
      res.status(404).json({ message: 'Match inconnu' })
    })
}
