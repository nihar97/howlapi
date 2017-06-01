var mongoose = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');


var UserSchema = new Schema ({
	//this can just be name from facebook, but still needs to be passed in
    userID: {type: String, required: true, index: {unique:true}},
    password: { type: String, required: true, select: false },
    DOB: {type: Date, required: true},
    repscore: {type: Number, required: true},
    notifications: {type: Boolean, required: true},
    radius: {type: Number, required: true},
    img_url: {type: String},
	facebook_url: {type: String, required:true},
    posts: {type: [Number]},
    replies: {type: [Number]}
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