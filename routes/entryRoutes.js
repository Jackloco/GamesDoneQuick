const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
const User = require('../models/user');
const ensureLogin = require("connect-ensure-login");


// router.use((req, res, next) => {
//     if (req.session.currentUser) {
//       next();
//     } else {
//       res.redirect("/login");
//     }
//   });
// this way make all the routes in the file private (and also any other routes
// that are connected to app.js AFTER this file)

router.get('/entries', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    // if(!req.session.currentUser){
    //     res.redirect('/login');
    //     return;
    // } // this way you can use to make ONE SINGLE ROUTE private but oyu have to do it in every route that you want to restrict
    Entry.find()
        .populate('user')
        .then((listOfEntries) => {
            res.render('entries', {listOfEntries});
        })
        .catch((err) => {
            next(err);
        })
});


router.get('/entries/new', (req, res, next) => {
    User.find()
        .then((allTheUsers) => {
            res.render('newEntry', {allTheUsers});
        })
        .catch((err) => {
            next(err);
        })
});


router.post('/entries/create', (req, res, next) => {
    const newEntry = new Entry({
        game: req.body.game,
        console: req.body.console,
        time: req.body.time,
        userId: req.body.userId,
        youtubeLink: String
    });

//    const newBook = new Book(req.body)
// ^ this is super fancy mode, use if you dare

    newEntry.save()
        .then((response) => {
            res.redirect('/entries')
        })
        .catch((err) => {
            next(err);
        })

});

router.get('/entries/:id/edit', (req, res, next) => {
    Entry.findById(req.params.id)
        .then((theEntry) => {

            User.find()
                .then((allTheUsers) => {

                    allTheUsers.forEach((user) => {

                        if (user._id.equals(theEntry.user)) {

                            user.yes = true;
                        }
                    })
                    res.render('editEntry', {theEntry: theEntry, allTheUsers: allTheUsers})
                })
                .catch((err) => {
                    next(err)
                })
        })
        .catch((err) => {
            next(err);
        })
})


router.post('/entries/:id/update', (req, res, next) => {
    Entry.findByIdAndUpdate(req.params.id, {
        game: req.body.game,
        console: req.body.console,
        time: req.body.time,
        userId: req.body.userId,
        youtubeLink: String
    })
        .then((theEntry) => {
            res.redirect('/entries/' + theEntry._id)
        })
        .catch((err) => {
            next(err);
        })
})

router.post('/entries/:id/delete', (req, res, next) => {
    Entry.findByIdAndRemove(req.params.id)
        .then((reponse) => {
            res.redirect('/entries');
        })
        .catch((err) => {
            next(err);
        })
})


router.get('/entries/:id', (req, res, next) => {
    const id = req.params.id;
    Entry.findById(id)
        .populate('username')
        .then((theEntry) => {
            res.render('entryDetails', {theEntry: theEntry});
        })
        .catch((err) => {
            next(err);
        })
});

// this is what theBook looks like
// {title: 'animal farm', description: 'lorem ipsum dolor', reviews: [{}, {}, {}]     }


module.exports = router;
