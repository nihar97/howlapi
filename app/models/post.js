var mongoose = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema = new Schema({
    user: {type: String},
    title: {type: String},
    locationPosted: {type:[Number]},
    canReply: {type: Boolean},
    numReplies: {type: Number},
    replies: {type: [Number]},
    content: {type: String},
    numLikes: {type: Number},
    canVote: {type: Boolean},
    postId: {type: Number},
    categories: {type: [String]},
    timestamp:{type: Number},
    radius: {type: Number}
});

module.exports = mongoose.model('Post', PostSchema);     