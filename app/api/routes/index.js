var express = require('express');
var router = express.Router();

var ctrlGallery = require("../controllers/gallery.controller");
var ctrlCollection = require("../controllers/collection.controller");

router.
	route('/gallery')
	.post(ctrlGallery.pictureUpload);


router.
	route('/collection/:collectionName')
	.get(ctrlCollection.getCollectionByName);


router.route('/collection').post(ctrlCollection.saveCollection);
 
module.exports = router;