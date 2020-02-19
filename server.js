const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const path = require('path');


const loginRouter = require('./routes/users');
const usersRouter = require('./routes/index');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: 'hgkjhgkjhgkjhgkjh',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', loginRouter);
app.use('/users', usersRouter);

app.listen(4000)