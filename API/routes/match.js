const express = require('express')
const router = express.Router()

const matchCtrl = require('../controllers/match')

router.post('/', matchCtrl.newMatch)
router.put('/:id', matchCtrl.closeMatch)
router.delete('/:id', matchCtrl.deleteMatch)
/* Pour créer un nouveau match, la requête doit fournir deux informations :
le nombre de stock & la liste des participants :
ex: {"stocks" : 2, "participants":[{"player":1, "character":1}, {"player":2, "character":1}]}
*/

module.exports = router
