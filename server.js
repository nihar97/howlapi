var express = require(express);
var app = express();
var bodyParser = require('body-parser'); 	// get body-parser
var morgan     = require('morgan'); 		// used to see requests
var mongoose   = require('mongoose');
var config 	   = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

app.use(morgan('dev'));
// mongoose.connect(config.database); 


var apiRoutes = require('./app/routes/apiRouter')(app, express);
app.use('/', apiRoutes);
// START THE SERVER
// ====================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
