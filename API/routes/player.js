const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const playerCtrl = require('../controllers/player')

router.post('/signup', multer, playerCtrl.signup, playerCtrl.login)
router.post('/login', playerCtrl.login)
router.get('/',auth.auth, playerCtrl.getAllPlayers)
router.put('/:id', auth.adminAuth, playerCtrl.switchAdmin)
router.put('/update/:id', auth.auth, multer, playerCtrl.modifyPlayer)
/* exemple de requête :
{"name": "fefe", "password":"polo", "email":"teset@test.com"}

exemple de réponse :

{
    "message": "Le joueur fefe a bien été créé !"
}

*/

module.exports = router
