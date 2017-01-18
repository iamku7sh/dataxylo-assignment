var dbconn = require('../data/dbconnection.js');

module.exports.pictureUpload = function(req, res){

	var db = dbconn.get();
	var description = req.body.description,
	filename = req.files[0].filename;


	var uploads = db.collection('uploads');

	var id = filename.split('.')[0],
	url = './uploads/' + filename;

	var data = {id: id, url : url, description: description};

	uploads.insertOne(data,function(err, response){

		res
			.status(201)
			.json({id: id, url : url, description: description});
	})

}