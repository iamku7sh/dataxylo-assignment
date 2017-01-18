var dbconn = require('../data/dbconnection.js');


module.exports.getCollectionByName = function(req, res){

	var collectionName = req.params.collectionName;
	var db = dbconn.get();
	var collections = db.collection('collections');

	collections.findOne({collectionName : collectionName},function(err, docs){

		res
			.status(200)
			.json(docs.uploads);
	});

}


module.exports.saveCollection = function(req,res){

	var db = dbconn.get();
	var collections = db.collection('collections');

	var reqData = JSON.parse(req.body.data);
	var data = {collectionName: reqData.collectionName, uploads: reqData.data};

	collections.insertOne(data,function(err, response){
		res
			.status(201)
			.json({message:'we inserted the data'});
	});

}