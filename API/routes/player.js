const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const playerCtrl = require('../controllers/player')

router.post('/signup', playerCtrl.signup)
router.post('/login', playerCtrl.login)
router.put('/:id', auth.adminAuth, playerCtrl.switchAdmin)
/* exemple de requête :
{"name": "fefe", "password":"polo", "email":"teset@test.com"}

exemple de réponse :

{
    "message": "Le joueur fefe a bien été créé !"
}

*/

module.exports = router
