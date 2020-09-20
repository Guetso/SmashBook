const express = require('express')
const router = express.Router()

const resultCtrl= require('../controllers/result')

router.post('/', resultCtrl.save)
/* exemple de requête :
{
    "podium": {
        "matchId": 1,
        "first": 1,
        "second": 2
    },
    "stocks": [
        {
            "matchParticipant": 1, --> a récupérer dans la réponse de la création d'un match => matchParticipantList
            "player_1": 0,
            "player_2": 3
        },
        {
            "matchParticipant": 2,
            "player_1": 2,
            "player_2": 0
        }
    ]
}

exemple de réponse :

{
    "message": "Résultats enregistrés !"
}

*/

module.exports = router