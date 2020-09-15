const { Match } = require('../models') // Pour accéder à la table match
const { Participant } = require('../models') // Pour accéder à la table participant
const participantController = require('../controllers/participant') // Pour récupérer la méthode qui vérifie et inscrit un participant dans la table participant

exports.newMatch = (req, res, next) => {
  participantController
    .createParticipants(req.body.participants) // on fourni à la méthode ".createParticipant", un tableau d'objet contenant les id du couple "joueur/personnage" souhaitant s'inscrire

    .then((participants) => {
      // une fois que la méthode nous renvoie la liste des participants "confirmés"
      Match.create({ stocks: req.body.stocks }) // On peut créer une instance du match, seule le paramètre du nombre de stock est à fournir par la requête

        .then((match) => {
          participants.forEach((participant) => {
            // On ajoute chaque participants confirmés au match
            Participant.findByPk(participant.id).then((participant) => {
              match.addParticipant(participant)
            })
          })
          return match // on renvoi les infos du match ainsi créé
        })

        .then((match) => {
          res.status(201).json({
            message: `Le match a bien été créé !`,
            match, // infos du match
            participants // tableau des participants au match
          })
        })
        .catch((error) => { // Gestion des erreurs dans la création d'un match
          console.log(error)
          res.status(400).json({
            error
          })
        })
    })
    .catch((error) => { // Gestion des erreurs dans la récupération de la liste des participants confirmés
      console.log(
        'Erreur dans la récupération de la liste des participants: ',
        error
      )
    })
}
