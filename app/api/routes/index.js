var express = require('express');
var router = express.Router();

var ctrlGallery = require("../controllers/gallery.controller");

router.
	route('/gallery')
	.post(ctrlGallery.pictureUpload);
 
module.exports = router;