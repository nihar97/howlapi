var mongoose = require('mongoose');
var Schema       = mongoose.Schema;

var ReplySchema = new Schema ({
    replyId: {type: Number},
    user: {type: String},
    content: {type: String},
    numLikes: {type: Number},
    canVote: {type: Boolean},
    postId: {type: Number}
});

module.exports = mongoose.model('Reply', ReplySchema);