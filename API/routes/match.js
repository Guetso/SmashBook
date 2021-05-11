const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const matchCrtl = require('../controllers/match')

router.get('/in_progress', auth.auth, matchCrtl.getInProgress)
router.post('/', auth.auth, matchCrtl.newMatch)
router.delete('/:id', auth.adminAuth, matchCrtl.deleteMatch)

module.exports = router
