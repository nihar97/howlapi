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
        User.findOne({'userID' : req.params.user_id}, function(err, user){
            console.log("we reached here");
            if(err) res.send(err);
            res.json(user);
        });
    })
    .put(function(req, res){
        User.findOne({'userID': req.params.user_id}, function(err, user){
            if(err) res.send(err);
            console.log("put request");
            if(req.body.userID) user.userID = req.body.userID;
            if(req.body.password) user.password = req.body.password;
            if(req.body.DOB) user.DOB = req.body.DOB;
            if(req.body.repscore) user.repscore = req.body.repscore;
            if(req.body.notifications) user.notifications = req.body.notifications;
            if(req.body.radius) user.radius = req.body.radius;
            if(req.body.img_url) user.img_url = req.img_url;
            if(req.body.facebook_url) user.facebook_url = req.body.facebook_url;
            if(req.body.reply) user.replies = user.replies + req.body.reply;
            
            user.save(function(err){
                if(err) res.send(err);
                
                res.json({message: 'User successfully updated'});
            });
        });
    });
    //     .delete(function(req, res) {
        //         User.findOne({'userID': req.params.user_id}, function)
        // });
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
            }).then(function(){
                console.log(postId);
                var post = new Post();
                post.user = req.body.user;
                post.title = req.body.title;
                post.locationPosted = [req.body.lat, req.body.lon];
                post.canReply = req.body.canReply;
                post.numReplies = 0;
                post.replies = [];
                post.content = req.body.content;
                post.postId = postId;
                post.categories = req.body.categories;
                post.timestamp = req.body.timestamp;
                post.radius = req.body.radius;
                
                User.findOne({'userID': req.body.user, function(err, user){
                    console.log("here");
                    if(err) res.send(err);
                    user.posts = user.posts + postId;
                    user.save(function(err){
                        if(err) res.send(err);
                    });
                }
            }).then(function(){
                
                post.save(function(err) {
                    if(err) res.send(err);
                    
                    res.json({message: 'Post successfully created'});
                })
            });
        });
    });
    router.route("/posts/:post_id")
    .get(function(req, res){
        Post.findOne({'postID' : req.params.postID}, function(err, post){
            console.log("we reached posts");
            if(err) res.send(err);
            res.json(post);
        });
    })
    .put(function(req,res){
        Post.findOne({'postID' : req.params.postID}, function(err, post){
            if(err) res.send(err);
            if(req.body.user) post.user = req.body.user;
            if(req.body.title) post.title = req.body.title;
            if(req.body.canReply) post.canReply = req.body.canReply;
            if(req.body.content) post.content = req.body.content;
            if(req.body.categories) post.categories = req.body.categories;
            if(req.body.radius) post.radius = req.body.radius;
            
            post.save(function(err) {
                if(err) res.send(err);
                
                res.json({message: 'Post successfully updated'});
            });
        });
        router.route("/posts/:post_id/replies")
        .post(function(req, res){
            var replyID;
            Post.findOne({'postID' : req.params.postID}, function(err, post){
                replyID = post.replies.lenghth + 1;
                post.replies = post.replies + replyID;
                post.save(function(err){
                    if(err) res.send(err);
                })
            });
            
            var reply = new Reply();
            reply.replyID = replyID;
            reply.userID = req.body.user;
            reply.content = req.body.content;
            reply.postID = req.params.postID;
            
            User.findOne({'userID': req.body.user, function(err, user)
            {
                if(err) res.send(err);
                user.replies = user.replies + replyId;
                user.save(function(err){
                    if(err) res.send(err);
                })
            }});
            
            reply.save(function(err){
                if(err) res.send(err);
                
                res.json({message: 'Reply successfully created'});
            });
        });
        
        
        router.route("/replies/:reply_id")
        .get(function(req, res){
            Reply.findOne({'replyId': req.params.replyID, function(err, reply){
                if(err) res.send(err);
                
                res.json(reply);
            }});
        })
        .put(function(req, res){
            Reply.findOne({'replyID': req.params.replyID, function(err, reply){
                if(err) res.send(err);
                
                if(req.body.content) reply.content = req.body.content;
                
                reply.save(function(err){
                    if(err) res.send(err);
                    
                    res.json({message: 'Reply updated!'});
                })
                
            }})
        });
        
    })
    return router;
};