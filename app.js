
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , database = require('./db');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/descriptions', function (req, res) {
	res.send("Gimme some descriptions");
});

//TODO replace stake
app.get('/questions/:description', function (req, res) {
	//var input = req.params.description;
	var input;
	database.find('inputs', {}, 100, function(err, data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			input = data;
			//console.log('smurf');
			res.json(data);
		}
	});
	//	input = data;
	//	res.send(data)} );
	//res.send(input);
});

database.open(function(err) {
	if(err) throw err;
	app.listen(3000);
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
})
// app.listen(3000);
// console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
