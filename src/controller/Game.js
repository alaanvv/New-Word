const Text = require('../model/Text')
const db = require('../../db/conn')

const page = (req, res) => {
  res.render('game/game', { username: req.session.user.username, points: req.session.user.points })
}

const post = async (req, res) => {
  const Post = new Text(req.session.user.username, req.body.text)
  await Post.post()

  const points = await db.cmd(`select points from users where username = '${req.session.user.username}'`)
  req.session.user.points = points[0].points

  if (Post.errors.length) {
    req.flash('error', Post.errors)
    return res.redirect('back')
  }

  res.redirect('/game')
}

const ranking = async (req, res) => {
  const data = await db.cmd('select * from users order by points desc')
  res.render('game/ranking', { data: data })
}

module.exports = { page, post, ranking }