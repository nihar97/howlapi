var mongoose = require('mongoose');
var Schema       = mongoose.Schema;
var post = require(post);
var user = require(user);

var ReplySchema = new Schema ({
    user: type: user,
    content: type: String,
    numLikes: type: Number,
    canVote: type: Boolean,
    post: type: post
});