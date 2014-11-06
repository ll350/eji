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
	}
}

// End codecopypasta