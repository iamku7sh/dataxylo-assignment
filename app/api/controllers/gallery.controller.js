var dbconn = require('../data/dbconnection.js');
var request = require('request');
var fs = require('fs');

module.exports.pictureUpload = function(req, res){

	console.log(req.body);

	var db = dbconn.get();
	var description = req.body.description,
	uri = req.body.url == 'false' ? false : req.body.url;

	var filename;


	if(uri){
		var extension = uri.split('.').pop().split(/\#|\?/)[0];
		filename = Date.now() + '.' + extension;
	}
	else{

		filename = req.files[0].filename;
	}



	var uploads = db.collection('uploads');

	var id = filename.split('.')[0],
	url = './uploads/' + filename;

	var data = {id: id, url : url, description: description};


	if(uri){
		var file = fs.createWriteStream('./public/uploads/'+filename);
		request(uri).pipe(file).on("close", function(){
					uploads.insertOne(data,function(err, response){

				res
					.status(201)
					.json({id: id, url : url, description: description});
			})		
		})
	}
	else{

		uploads.insertOne(data,function(err, response){

			res
				.status(201)
				.json({id: id, url : url, description: description});
		})
	}


}