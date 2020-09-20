const { Participant } = require('../models')
const isUnique = require('../helpers')

/* Création d'une méthode qui sera appelé dans le controller match,
qui lui fournira la liste des participants qui vont s'inscrire à un match en paramètre.
Cette méthode fait appelle à .map : on va utiliser le tableau des participant souhaitant s'inscrire, pour vérifier
s'ils n'existent pas déjà dans la table 'participant', si ce n'est pas le cas, le/les participants sont créé dans la table.
Cette méthode est une promesse qui renvoit un nouveau tableau des participants "confirmés" (ils existent dans la table "participant")

NB:

- Un "player" = un compte utilisateur (ex: Guetso)
- Un "character" = un personnage combattant choisie par l'utilisateur (ex: Young Link)
- Un "participant" = le couple player/character (ex: Guetso/Young Link)
- Un "participant confirmé" = est un participant qui est bien inscrit dans la table participant

*/

exports.createParticipants = (participantsArray) => {
  return new Promise((resolve, reject) => {
    // Cette méthode est une promesse qui en cas de réussite, renvoie au controller match, un tableau de participants confirmés

    if (isUnique(participantsArray)) { // On vérifie que le participant n'existe pas déjà
      let promises = participantsArray.map((participant) => {
        return Participant.findOrCreate({
          // Si le participant n'existe pas encore, on le créer, sinon on le récupère
          where: {
            playerId: participant.player, // Pour cela on a besoin de 2 infos : le joueur et le personnage
            characterId: participant.character
          }
        })
          .then(([participant, created]) => {
            return participant.id
          })
          .catch((error) => {
            console.log(error)
            throw new Error(error)
          })
      })
      Promise.all(promises)
        .then((participantsList) => {
          resolve(participantsList) // Résolution de la promesse initiale (createParticipant)
        })
        .catch((error) => {
          console.log(
            'Erreur dans la création du tableau de participant: ',
            error
          )
          reject(error)
        })
    } else {
      throw new Error('La liste des joueurs contient des doublons')
    }
  })
}
