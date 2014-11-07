
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , database = require('./db')
  , _ = require('underscore');
  

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

	var input = req.params.description;

	database.questions(input, function(err, data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			if(data != null && data.length > 0) {
				input = data;
				var test = req.params.description;
				res.json(data);		
			}
			else {
				res.send('No data returned from questions');
			}
		}
	});


});

app.get('/doctors/:city', function (req, res) {

	var input = req.params.city;

	database.doctors(input, function(err, data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			if(data != null && data.length > 0) {
				input = data;
				var test = req.params.description;
				res.json(data);		
			}
			else {
				res.send('No data returned from doctors');
			}
		}
	});


});

app.get('/hospitals/:city', function (req, res) {

	var input = req.params.city;

	database.hospitals(input, function(err, data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			if(data != null && data.length > 0) {
				input = data;
				var test = req.params.description;
				res.json(data);		
			}
			else {
				res.send('No data returned from hospitals');
			}
		}
	});


});

//TODO: Use this to replace the JSON Hack
app.get('/costs/:drg', function (req, res) {

	var input = req.params.drg;

	database.costs(input, function(err, data) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			if(data != null && data.length > 0) {
				input = data;
				var test = req.params.description;
				res.json(data);		
			}
			else {
				res.send('No data returned from costs');
			}
		}
	});


});

//get the list of choices by selcting descriptions from input collection
app.get('/choices', function (req, res) {
	
	var data_returned;
	
		database.choices(function(err, data_returned) {
		if(err) {
			console.log(err);
			res.send(err);
		}
		else {
			if(data_returned != null && data_returned.length > 0) {
				console.log(data_returned);
				res.send(data_returned);		
			}
			else {
				res.send('No data returned for choices');
				console.log(data_returned);
			}
		}
	});


});

database.open(function(err) {
	if(err) throw err;
	app.listen(3000);
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
})

//Why so crashy?
