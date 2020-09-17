const express = require('express')
const router = express.Router()

const resultCtrl= require('../controllers/result')

router.post('/', resultCtrl.save)
/* exemple de requête :

*/

module.exports = router