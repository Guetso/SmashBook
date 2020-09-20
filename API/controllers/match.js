const { Match } = require('../models') // Pour accéder à la table match
const { Participant } = require('../models') // Pour accéder à la table participant
const participantController = require('../controllers/participant') // Pour récupérer la méthode qui vérifie et inscrit un participant dans la table participant

exports.newMatch = (req, res, next) => {
  participantController
    .createParticipants(req.body.participants) // on fourni à la méthode ".createParticipant", un tableau d'objet contenant les id du couple "joueur/personnage" souhaitant s'inscrire

    .then((participantsList) => {
      // une fois que la méthode nous renvoie la liste des participants "confirmés"
      Match.create({
        stocks: req.body.stocks,
        player_1: participantsList[0],
        player_2: participantsList[1],
        player_3: participantsList[2],
        player_4: participantsList[3],
        player_5: participantsList[4],
        player_6: participantsList[5],
        player_7: participantsList[6],
        player_8: participantsList[7]
      }) // On peut créer une instance du match, seul le paramètre du nombre de stock est à fournir par la requête

        .then((match) => {
          let matchParticipantList = participantsList.map((participant) => {
            // On ajoute chaque participants confirmés au match
           return Participant.findByPk(participant).then((participant) => {
              return match
                .addParticipant(participant)
                .then((matchParticipant) => {
                  return matchParticipant[0].id
                })
                .catch((error) => {
                  console.log(
                    "Erreur dans l'inscription d'un participant: ",
                    error
                  )
                })
            })
          })
          Promise.all(matchParticipantList)
            .then((matchParticipantList) => {
              res.status(201).json({
                message: 'Le match a bien été créé !',
                match,
                matchParticipantList
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

exports.deleteMatch = (req, res, next) => {
  Match.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((match) => {
      Match.destroy({
        where: {
          id: match.id
        }
      }).then(() => {
        res.status(200).json({
          message: 'Match supprimé !'
        })
      })
    })
    .catch((error) => {
      res.status(404).json({ message: 'Match inconnu' })
    })
}
