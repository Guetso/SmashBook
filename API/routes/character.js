const express = require('express')
const router = express.Router()

const characterCtrl= require('../controllers/character')

router.post('/', characterCtrl.add)
/* exemple de requête: 
{"name": "Link", "gameId": 101}
*/

module.exports = router