const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const resultCrtl = require('../controllers/result')

router.post('/', auth.auth, resultCrtl.newResult, resultCrtl.newStocks)
router.get('/stock', auth.auth, resultCrtl.getAllPlayerStock)
/* exemple de requête: 
{
    "podium": [
        {
            "participation_id": 3, <-- Participation_Id
            "place": 1
        },
        {
            "participation_id": 4,
            "place": 2
        }
    ],
    "stocks": [
        {
            "from_id": 1, <-- Participation_Id
            "to_id": 2,   <-- Participation_Id
            "stocks": 3
        },
        {
            "from_id": 1,
            "to_id": 1,
            "stocks": 0
        },
        {
            "from_id": 2,
            "to_id": 1,
            "stocks": 2
        },
        {
            "from_id": 2,
            "to_id": 2,
            "stocks": 0
        }
    ]
}
*/

/*exemple de réponse :
{
    "message": "Résultats enregistrés !"
}

*/

module.exports = router
