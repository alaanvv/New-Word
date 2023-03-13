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

  req.session.user = { username: account.username, email: account.email, points: account.points } 
  res.redirect('/game')
}

const register = async (req, res) => {
  const account = new User(req.body)
  await account.register()

  if (account.errors.length) {
    req.flash('error', account.errors)
    return res.redirect('back')
  }  

  req.session.user = { username: account.username, email: account.email, points: account.points }
  res.redirect('/game')
}

const logout = async (req, res) => {
  req.session.user = undefined
  res.redirect('/')
}

module.exports = { page, login, register, logout }