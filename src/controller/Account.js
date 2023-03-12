const User = require('../model/User')

const page = (req, res) => {
  res.render('login/login')
}

const login = async (req, res) => {
  const account = new User(req.body)
  await account.login()

  if (account.errors.length) {
    req.flash('error', account.errors)
    return res.redirect('back')
  }
  res.send(`Logged as ${account.username}`)
}

const register = async (req, res) => {
  const account = new User(req.body)
  await account.register()

  if (account.errors.length) {
    req.flash('error', account.errors)
    return res.redirect('back')
  }
  res.send(`Logged as ${account.username}`)
}

module.exports = { page, login, register }