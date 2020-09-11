const express = require('express')
const router = express.Router()

const participantCtrl= require('../controllers/participant')

router.post('/', participantCtrl.createParticipant)

module.exports = router