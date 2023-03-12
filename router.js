const express = require('express')
const account = require('./src/controller/Account')

const router = new express.Router()

router.get('/', account.page)
router.post('/login', account.login)
router.post('/register', account.register)

module.exports = router