const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentData = new Schema({
    Title: {
        type: String,
    },
    Comment: {
        type: String,
    },
    });

const Comment = mongoose.model('comment', commentData);

module.exports = Comment;




