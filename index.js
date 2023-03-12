const express = require('express')
const flash = require('express-flash')
const session = require('express-session')
const router = require('./router')
require('dotenv').config()

const app = express()
const port = 314

app.set('view engine', 'ejs')
app.set('views', './src/views')

// Middlewares
app.use(session({ secret: process.env.TOKEN, resave: false, saveUninitialized: true }))
app.use(flash())
app.use((req, res, next) => { res.locals.errors = req.flash('error'); next() })
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.listen(port, () => { console.log(`App running on http://localhost:${port}`) })