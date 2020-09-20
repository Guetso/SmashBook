const express = require('express')
const router = express.Router()

const matchCrtl= require('../controllers/match')

router.post('/', matchCrtl.newMatch)
/* exemple de requête: 

*/

/*exemple de réponse :*/

module.exports = router