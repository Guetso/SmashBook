const express = require('express')
const router = express.Router()

const matchCtrl = require('../controllers/match')

router.post('/', matchCtrl.newMatch)

module.exports = router
