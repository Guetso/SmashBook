const express = require('express')
const router = express.Router()

const playerCtrl= require('../controllers/player')

router.post('/signup', playerCtrl.signup)
/* exemple de requête :
{"name": "fefe", "password":"polo", "email":"teset@test.com"}
*/

module.exports = router