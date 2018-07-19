const express = require('express');
const router = express.Router();
const Forum = require('../models/forum');
const User = require('../models/user');
const ensureLogin = require("connect-ensure-login");
const passport = require("passport");


router.get('/forum', ensureLogin.ensureLoggedIn(), (req, res, next) => {

    Forum.find()
    // populate('user')
        .then((listOfForum) => {
            res.render('forum', {listOfForum});
        })
        .catch((err) => {
            next(err);
        })
});

router.get('/forum/new', (req, res, next) => {
    User.find()
        .then((allTheUsers) => {
            res.render('newForum', {allTheUsers});
        })
        .catch((err) => {
            next(err);
        })
});


router.post('/forum/create', (req, res, next) => {
    const newForum = new Forum({
        username: req.body.username,
        topic: req.body.topic,
        body: req.body.body
    });

//    const newBook = new Book(req.body)
// ^ this is super fancy mode, use if you dare

    newForum.save()
        .then((response) => {
            res.redirect('/forum')
        })
        .catch((err) => {
            next(err);
        })

});

router.get('/forum/:id/edit', (req, res, next) => {
    Forum.findById(req.params.id)
        .then((theForum) => {

            User.find()
                .then((allTheUsers) => {

                    allTheUsers.forEach((user) => {

                        if (user._id.equals(theForum.user)) {

                            user.yes = true;
                        }
                    })
                    res.render('editForum', {theForum: theForum, allTheUsers: allTheUsers})
                })
                .catch((err) => {
                    next(err)
                })
        })
        .catch((err) => {
            next(err);
        })
})


router.post('/forum/:id/update', (req, res, next) => {
    Forum.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        topic: req.body.topic,
        body: req.body.body
    })
        .then((theForum) => {
            res.redirect('/forum/' + theForum._id)
        })
        .catch((err) => {
            next(err);
        })
})

router.post('/forum/:id/delete', (req, res, next) => {
    Forum.findByIdAndRemove(req.params.id)
        .then((reponse) => {
            res.redirect('/forum');
        })
        .catch((err) => {
            next(err);
        })
})

router.get('/forum/:id', (req, res, next) => {
    const id = req.params.id;
    Forum.findById(id)
        .then((theForum) => {
            res.render('forumDetails', {theForum: theForum});
        })
        .catch((err) => {
            next(err);
        })
});

module.exports = router;