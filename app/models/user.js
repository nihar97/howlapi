var mongoose = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');
var post         = require(post)
var reply        = require(reply)
var PostSchema = mongoose.model('Post', post.PostSchema);
var ReplySchema = mongoose.model('Reply', reply.ReplySchema);

var UserSchema = new Schema ({
    name: {type: String, required: true},
    userID: {type: String, required: true, index: {unique:true}},
    password: { type: String, required: true, select: false },
    email: {type: String, required: true, index: {unique:true}},
    DOB: {type: Date, required: true},
    repscore: {type: Number, required: true},
    notifications: {type: Boolean, required: true},
    radius: {type: Number, required: true},
    img_url: type: String,
    posts: type: PostSchema[],
    replies: type: ReplySchema[]
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
	var user = this;

	// hash the password only if the password has been changed or user is new
	if (!user.isModified('password')) return next();

	// generate the hash
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);

		// change the password to the hashed version
		user.password = hash;
		next();
	});
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
	var user = this;

	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);