const express = require('express')
const router = express.Router()

const resultCrtl= require('../controllers/result')

router.post('/', resultCrtl.newResult)
/* exemple de requête: 

*/

/*exemple de réponse :*/

module.exports = router