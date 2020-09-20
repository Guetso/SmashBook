const express = require('express')
const router = express.Router()

const matchCtrl = require('../controllers/match')

router.post('/', matchCtrl.newMatch)
router.delete('/:id', matchCtrl.deleteMatch)
/* Pour créer un nouveau match, la requête doit fournir deux informations :
le nombre de stock & la liste des participants :
Exemple de requête :
{
    "stocks": 2,
    "participants": [
        {
            "player": 1,
            "character": 1
        },
        {
            "player": 2,
            "character": 1
        }
    ]
}

Exemple de réponse :

{
    "message": "Le match a bien été créé !",
    "match": {
        "id": 1,
        "stocks": 3,
        "player_1": 1,
        "player_2": 2,
        "updatedAt": "2020-09-20T09:06:01.810Z",
        "createdAt": "2020-09-20T09:06:01.810Z"
    },
    "matchParticipantList": [
        1,
        2
    ]
}

*/

module.exports = router
