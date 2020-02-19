var express = require('express');
var router = express.Router();
var db = require('../models');

// to add a name to the list
router.get('/add', function (req, res) {
    if (req.session.login) {
        let user = req.query.name.toLowerCase()
        db.User.findOrCreate({where: {name: user}, defaults: {name: user}})
            .then(result => {
                if(user === '')
                {
                    res.send(JSON.stringify("empty"));
                }
                else if (result[1]) {
                    console.log(result[1]);
                    db.User.findAll({attributes: ['name']})
                        .then((user) => res.json(user))
                }
                else
                    res.send(JSON.stringify("exist"));
            })
            .catch(() => {
                res.status(404).send('erorr occurred!');
            });
    } else
        res.send(JSON.stringify("login"));
});

// to delete a name of the list
router.get('/delete', function (req, res) {
    if (req.session.login) {
        let name = req.query.name.toLowerCase()
        db.User.findOne({
            where: {name: name},
        }).then(user => {
            if (user != null) {
                user.destroy();
                db.User.findAll({attributes: ['name']})
                    .then((user) => res.json(user))
            } else
                res.send(JSON.stringify("not exist"));
            }).catch(() => {
            res.status(404).send('erorr occurred!');
        });
    } else
        res.send(JSON.stringify("login"));

});

// for the first time runing the server we need to loaded the list to the client
router.get('/allList', function (req, res) {
    if (req.session.login) {
    db.User.findAll({attributes: ['name']})
        .then((user) => res.json(user))
    } else
        res.send(JSON.stringify("login"));
});

module.exports = router;
