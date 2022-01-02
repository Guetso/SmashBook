const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const sessionCtrl = require('../controllers/session')

router.get('/:id', auth.auth, sessionCtrl.getOne)

module.exports = router
