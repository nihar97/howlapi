var mongoose = require('mongoose');
var Schema       = mongoose.Schema;
var user = require(user);
var reply = require(reply);
var UserSchema = mongoose.model('User', user.UserSchema);
var ReplySchema = mongoose.model('Reply', reply.ReplySchema);
var PostSchema = new Schema({
    user: type: String,
    title: type String,
    locationPosted: type:Number[],
    canReply: type: boolean,
    numReplies: type: Number,
    replies: type: Number[],
    content: type: String,
    numLikes: type: Number,
    canVote: type: Boolean,
    postId: type: Number,
    categories: type: String[],
    timestamp: Number,
    radius: type: Number
});

module.exports = mongoose.model('Post', PostSchema);     