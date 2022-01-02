const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const matchCrtl = require('../controllers/match')
const sessionCrtl = require('../controllers/session')

router.get('/', auth.auth, matchCrtl.getAllMatches)
router.get('/:itemPerPages&:page', auth.auth, matchCrtl.getPagedMatches)
router.get('/in_progress', auth.auth, matchCrtl.getInProgress)
router.post('/', auth.auth, sessionCrtl.newSession, matchCrtl.newMatch)
router.delete('/:id', auth.auth, matchCrtl.deleteMatch)

module.exports = router
