var mongoose = require('mongoose');
var Schema       = mongoose.Schema;
var post = require(post);
var user = require(user);

var UserSchema = mongoose.model('User', user.UserSchema);
var PostSchema = mongoose.model('Post', post.PostSchema);
var ReplySchema = new Schema ({
    user: type: UserSchema,
    content: type: String,
    numLikes: type: Number,
    canVote: type: Boolean,
    post: type: PostSchema
});