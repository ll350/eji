var Db = require('mongodb').Db
  ,Connection = require('mongodb').Connection
  ,Server = require('mongodb').Server;
  
var configHost = process.env['MONGO_NODE_DRIVER_HOST']
  ,configPort =  process.env['MONGO_NODE_DRIVER_PORT']
  ,host = configHost != null ? configHost : 'localhost'
  ,port = configPort != null ? configPort : Connection.DEFAULT_PORT;
  
  var dbase = new Db('entrinsik1', new Server(host, port, {}), {native_parser:false});

  //Copied below from JS NodeJS Shamelessly
  module.exports = {
    find: function(name, query, limit, callback) {
      dbase.collection(name).find(query)
        .sort({_id: -1})
        .limit(limit)
        .toArray(callback);
    },
    findOne: function(name, query, callback) {
      dbase.collection(name).findOne(query, callback);
    },
	open: function(callback) {
	    dbase.open(callback);
	},
	choices: function(callback) {
        dbase.collection('inputs').find({}, {'_id': 0, 'description': 1})
          .sort({description: -1})
          .limit(10)
          .toArray(callback);
	},
	questions: function(name, callback) {
        dbase.collection('inputs').find({'description': name}, {'_id': 0, 'questions': 1})
          .sort({description: -1})
          .limit(10)
          .toArray(callback);
	},
	//TODO: finish
	doctors: function(city, callback) {
        dbase.collection('doctors').find({'City': city}, {'_id': 0, "Last Name/Organization Name": 1, 'Factor': 1})
          .sort({description: -1})
          .limit(10)
          .toArray(callback);
	},
	hospitals: function(city, callback) {
        dbase.collection('hospitals').find({'City': city}, {'_id': 0, "First Name": 1, "Last Name/Organization Name": 1, 'Factor': 1})
          .sort({description: -1})
          .limit(10)
          .toArray(callback);
	},
	costs: function(drg_code, callback) {
        dbase.collection('costs').find({'Code': drg_code})
          .sort({description: -1})
          .limit(10)
          .toArray(callback);
	}
}

// End codecopypasta