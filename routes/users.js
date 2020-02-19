const express = require('express');
const router = express.Router();
const passport = require('passport')
const bcrypt = require('bcrypt')
const users = require('../loginUsers/users')
const initializePassport = require('../config/passport-config')
const methodOverride = require('method-override')
router.use(methodOverride('_method'))

// check the password
initializePassport(
    passport,
    name => users.users.find(user => user.name === name),
    id => users.users.find(user => user.id === id)
)

// check if not registered
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

// check if login
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

router.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

router.get('/login', checkNotAuthenticated, (req, res) => {
   res.render('login.ejs')
})

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

// create a new user
router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        req.session.login = true;
        res.redirect('/login')
    } catch {
        req.session.login = false;
        res.redirect('/register')
    }
})

// middlewere check if admin entered
router.post('/login', function(req, res, next) {
    if((req.body.name === 'admin') && (req.body.password === '1234')) {
        req.session.login = true;
    }
    next();
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

// logout
router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})


module.exports = router;
