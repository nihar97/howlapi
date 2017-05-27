var User = require('../models/user.js');
var Post = require('../models/post.js');
var Reply = require('../models/reply.js');
var config = require('../../config.js');

module.exports = function(app, express) {
    var router = express.Router();
    router.get("/", function(req, res){
        console.log("someone came")
        res.json("Welcome to the howl api!")
    });
    router.route("/users")
     .get(function(req, res){
        User.find({}, function(err, users){
            if (err) res.send(err);

            res.json(users);
        });
    })

    .post(function(req,res){
        console.log("new user added");
        var user = new User();
        user.userID = req.body.userID;
        user.password = req.body.password;
        user.DOB = req.body.DOB;
        user.repscore = 0;
        user.notifications = req.body.notifications;
        user.radius = req.body.radius;
        user.img_url = req.body.img_url;
        user.facebook_url = req.body.facebook_url;
        user.posts = [];
        user.replies = [];

        user.save(function(err) {
            if(err) {
                if(err.code == 11000)
                    return res.json({success:false, message: 'A user with this username already exists'});
                else
                    return res.send(err);
                }
            res.json({message: 'User successfully created'});
            }
        );
    });

    router.route("/users/:user_id")
        .get(function(req, res){
            User.findById(req.params.userID, function(err, user){
                if(err) res.send(err);

                res.json(user);
            });
        })
        .put(function(req, res){
            User.findById(req.params.userID, function(err, user){
                if(err) res.send(err);

                if(req.body.userID) user.userID = req.body.userID;
                if(req.body.password) user.password = req.body.password;
                if(req.body.DOB) user.DOB = req.body.DOB;
                if(req.body.repscore) user.repscore = req.body.repscore;
                if(req.body.notifications) user.notifications = req.body.notifications;
                if(req.body.radius) user.radius = req.body.radius;
                if(req.body.img_url) user.img_url = req.img_url;
                if(req.body.facebook_url) user.facebook_url = req.facebook_url;
                if(req.body.post) user.posts = user.posts + req.body.post;
                if(req.body.reply) user.replies = user.replies + req.body.reply;

                user.save(function(err){
                    if(err) res.send(err);

                    res.json({message: 'User successfully updated'});
                });
            });
        });
    router.post("/authenticate", function(req, res){});
    router.route("/posts")
    .get(function(req, res){
        Post.find({}, function(err, posts){
            if(err) res.send(err);

            res.json(posts);
        });
    })

    .post(function(req, res){
        var postId;
        Post.find({}, function(err, posts){
            postId = posts.length + 1;
        });
        var post = new Post();
        post.user = req.body.user;
        post.title = req.body.title;
        post.locationPosted = [req.body.lat, req.body.lon];
        post.canReply = req.body.canReply;
        post.numReplies = 0;
        post.replies = [];
        post.content = req.body.content;
        post.numLikes = 0;
        post.canVote = req.body.canVote;
        post.postId = postId;
        post.categories = req.body.categories;
        post.timestamp = req.body.timestamp;
        post.radius = req.body.radius;

        post.save(function(err) {
            if(err) res.send(err);

            res.json({message: 'Post successfully created'});
        }

        )
    });
    router.get("/posts/:post_id", function(req, res){});
    router.put("/posts/:post_id", function(req, res){});
    router.get("/posts/:post_id/replies", function(req, res){});
    router.get("/users/:user_id/posts", function(req, res){});
    router.get("/users/:user_id/replies", function(req, res){});
    router.get("/replies:reply_id", function(req, res){});
    return router;
};