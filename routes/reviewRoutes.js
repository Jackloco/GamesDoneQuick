const express = require('express');
const reviewRouter = express.Router();
const Entry = require('../models/entry');

reviewRouter.get('/entries/:id/reviews/new', (req, res, next) => {
    Entry.findById(req.params.id)
        .then((theEntry) => {
            res.render('addReview', {entry: theEntry})
        })
        .catch((daError) => {
            next(daError)
        })
});

reviewRouter.post('/entries/:id/reviews/create', (req, res, next) => {
    // const theReview = {reviewer: req.body.reviewer, content: req.body.content};
    // const theReview = req.body;
    //first argument is ID of thing you want to find
    //                        |           second argument is the update you want to run
    //                        |                            |
    Entry.findByIdAndUpdate(req.params.id, {$push: {reviews: req.body}})
        .then((response) => {

            res.redirect(`/entries/${req.params.id}`)
        })
        .catch((err) => {
            next(err);
        })
});

reviewRouter.post('/entries/:id/reviews/delete/:reviewIndex', (req, res, next) => {
    const entryID = req.params.id;
    const reviewIndex = req.params.reviewIndex;
    Entry.findById(entryID)
        .then((theEntryThatImEditing) => {
            theEntryThatImEditing.reviews.splice(reviewIndex, 1);
            // theBookThatImEditing.review[reviewIndex] = {reviewer: "me", content: "waaaahhhhh"}
            //this ^ would be one way to edit a particular review
            theEntryThatImEditing.save()
                .then((x) => {
                    res.redirect('/entries/' + entryID)
                })
                .catch((err) => {
                    next(err)
                })
        })
        .catch((err) => {
            next(err);
        })

});

module.exports = reviewRouter;