var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/dataXylo';
var _connection = null;

var open = function(){
	MongoClient.connect(dburl, function(err, db){
		if(err){
			console.log("DB connection failed");
			return;
		}

		_connection = db;
		console.log("database connected !!!");
	});

}

var get = function(){
	return _connection;
}


module.exports = {
	open : open,
	get : get
};