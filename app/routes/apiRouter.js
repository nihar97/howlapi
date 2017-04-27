module.exports = function(app, express) {
    var router = express.Router();
    router.get("/users", function(req, res){});
    router.get("/users/:user_id", function(req, res){});
    router.put("users/:user_id", function(req, res){});
    router.post("/users", function(req, res){});
    router.post("/authenticate", function(req, res){});
    router.get("/posts", function(req, res){});
    router.post("/posts", function(req, res){});
    router.get("/posts/:post_id", function(req, res){});
    router.put("/posts/:post_id", function(req, res){});
    router.get("/posts/:post_id/replies", function(req, res){});
    router.get("/users/:user_id/posts", function(req, res){});
    router.get("/users/:user_id/replies", function(req, res){});
};