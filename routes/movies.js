const express = require('express');
const router = express.Router();

const Movie = require('../schemas/movieData');
const Comment = require('../schemas/commentData');

router.get('/allMovies', function(req, res, next){
    Movie.find({}).then(data => res.send(data))
});

router.post('/movies', function(req, res){
    Movie.create(req.body).then(movie => res.send(movie));
});

router.post('/comments', function(req, res){
    Comment.create(req.body).then(comment => res.send(comment));
});

router.get('/allComments', function(req, res, next){
    Comment.find({}).then(data => res.send(data))
});

module.exports = router;
