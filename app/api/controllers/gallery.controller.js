

module.exports.pictureUpload = function(req, res){

	var description = req.body.description,
	filename = req.files[0].filename;

	var id = filename.split('.')[0],
	url = './uploads/' + filename;

	res
		.status(200)
		.json({id: id, url : url, description: description});

}