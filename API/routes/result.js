const express = require('express')
const router = express.Router()

const resultCrtl= require('../controllers/result')

router.post('/', resultCrtl.newResult, resultCrtl.newStocks)
/* exemple de requête: 
{
    "podium": [
        {
            "participation_id": 3,
            "place": 1
        },
        {
            "participation_id": 4,
            "place": 2
        }
    ],
    "stocks": [
        {
            "from_id": 1,
            "to_id": 2,
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