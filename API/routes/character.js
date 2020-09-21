const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const characterCtrl = require('../controllers/character')

router.post('/', auth.adminAuth, characterCtrl.add)
/* exemple de requête: 
{"name": "Zelda", "gameId": 101}
*/

/*exemple de réponse :
{
    "message": "Le personnage Zelda a bien été créé !"
}
*/

module.exports = router
