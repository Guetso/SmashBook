const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const matchCrtl = require('../controllers/match')

router.post('/', auth.auth, matchCrtl.newMatch)
/*
exemple de requête: 
{
    "participants": [
        {
            "player": "1",
            "character": 1
        },
        {
            "player": "2",
            "character": 1
        }
    ],
    "stocks": 3
}

exemple de réponse :
{
    "message": "Match créé",
    "participationsList": [
        {
            "id": 1,
            "player_id": "1",
            "character_id": 1,
            "match_id": 1,
            "updatedAt": "2020-09-21T08:30:37.598Z",
            "createdAt": "2020-09-21T08:30:37.598Z"
        },
        {
            "id": 2,
            "player_id": "2",
            "character_id": 1,
            "match_id": 1,
            "updatedAt": "2020-09-21T08:30:37.598Z",
            "createdAt": "2020-09-21T08:30:37.598Z"
        }
    ]
}
*/

router.delete('/:id', auth.adminAuth, matchCrtl.deleteMatch)

module.exports = router
