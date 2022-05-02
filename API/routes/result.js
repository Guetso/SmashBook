const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const resultCrtl = require('../controllers/result')
const matchCrtl = require('../controllers/match')

router.post(
  '/',
  auth.auth,
  resultCrtl.newPodium,
  resultCrtl.newStocks,
  matchCrtl.closeMatch
)
router.get('/stock', auth.auth, resultCrtl.getAllPlayerStocks)
router.get(
  '/players/:id',
  auth.auth,
  resultCrtl.getOnePlayerStocks,
  resultCrtl.getOnePlayerPodium1,
  resultCrtl.getOneParticipations
)
router.get('/:itemPerPages&:page', auth.auth, resultCrtl.getMatchesResults)
router.get('/sessions/:itemPerPages&:page', auth.auth, resultCrtl.getSessionsResults)

module.exports = router
