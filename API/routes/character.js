const express = require('express')
const router = express.Router()

const characterCtrl= require('../controllers/character')

router.post('/', characterCtrl.add)

module.exports = router