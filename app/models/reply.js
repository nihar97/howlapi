var mongoose = require('mongoose');
var Schema       = mongoose.Schema;

var ReplySchema = new Schema ({
    replyId: {type: Number},
    userID: {type: String},
    content: {type: String},
    postId: {type: Number}
});

module.exports = mongoose.model('Reply', ReplySchema);