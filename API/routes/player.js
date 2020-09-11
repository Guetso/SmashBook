const express = require('express')
const router = express.Router()

const playerCtrl= require('../controllers/player')

router.post('/signup', playerCtrl.signup)

module.exports = router