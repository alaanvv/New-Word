const express = require('express')
const account = require('./src/controller/Account')
const game = require('./src/controller/Game')

const router = new express.Router()

router.get('/', (req, res) => {
  if (req.session.user) res.redirect('/game')
  else account.page(req, res)
})
router.post('/login', account.login)
router.post('/register', account.register)
router.get('/logout', account.logout)

router.get('/game', (req, res) => {
  if (!req.session.user) res.redirect('/')
  else game.page(req, res)
})
router.post('/post', game.post)
router.get('/ranking', game.ranking)

module.exports = router