const express = require('express')
const router = express.Router()

const participantCtrl= require('../controllers/participant')

router.post('/', participantCtrl.createParticipant)

/* A ce jour cette route n'est pas utilisée, la création de participant (couple
 player/character) se fait uniquement via la création d'un match */

module.exports = router