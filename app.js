// require modules and port setting
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const verified = require('./login.js')
const port = process.env.PORT || 3000
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main'
})

// setup handlebars engine and file extension

app.engine(hbs.extname, hbs.engine, hbs.defaultLayout)
app.set('view engine', hbs.extname)

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// route setting
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  res.render('login', { message: '', login: true })
})

app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const result = verified(email, password)

  if (result !== undefined) {
    res.render('index', {
      user: result.firstName
    })
  } else {
    res.render('login', {
      email,

      message: 'email or password is incorrect.'
    })
  }
})

// set listener to Express server

app.listen(port, () => {
  console.log('Server is started')
})