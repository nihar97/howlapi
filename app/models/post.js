var mongoose = require('mongoose');
var Schema       = mongoose.Schema;
var user = require(user);
var reply = require(reply);
var PostSchema = new Schema({
    user: type: user,
    title: type String,
    locationPosted: type:Number[],
    canReply: type: boolean,
    numReplies: type: Number,
    replies: type: reply[],
    content: type: String,
    numLikes: type: Number,
    canVote: type: Boolean,
    postId: type: Number,
    categories: type: String[],
    timestamp: Number,
    radius: type: Number
});