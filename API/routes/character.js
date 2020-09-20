const express = require('express')
const router = express.Router()

const characterCtrl= require('../controllers/character')

router.post('/', characterCtrl.add)
/* exemple de requête: 
{"name": "Zelda", "gameId": 101}
*/

/*exemple de réponse :
{
    "message": "Le personnage Zelda a bien été créé !"
}
*/

module.exports = router