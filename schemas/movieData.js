const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieData = new Schema({
    Actors: {
        type: String,
    },
    Awards: {
        type: String,
    },
    BoxOffice: {
        type: String,
    },
    DVD: {
        type: String,
    },
    Country: {
        type: String,
    },
    Director: {
        type: String,
    },
    Genre: {
        type: String,
    },
    Language: {
        type: String,
    },
    Metascore: {
        type: String,
    },
    Plot: {
        type: String,
    },
    Poster: {
        type: String,
    },
    Production: {
        type: String,
    },
    Rated: {
        type: String,
    },
    Ratings: [
        {Source: {
            type: String,
        },
        Value: {
            type: String,
        }},
        {Source: {
            type: String,
        },
        Value: {
            type: String,
        }},
        {Source: {
            type: String,
        },
        Value: {
            type: String,
        }}
    ],
    Released: {
        type: String,
    },
    Response: {
        type: String,
    },
    Runtime: {
        type: String,
    },
    Title: {
        type: String,
    },
    Type: {
        type: String,
    },
    Website: {
        type: String,
    },
    Writer: {
        type: String,
    },
    Year: {
        type: String,
    },
    imdbID: {
        type: String,
    },
    imdbRating: {
        type: String,
    },
    imdbVotes: {
        type: String,
    },
    });

const Movie = mongoose.model('movie', movieData);

module.exports = Movie;




