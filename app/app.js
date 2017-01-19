require('./api/data/dbconnection.js').open();

var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');


var routes = require('./api/routes');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + file.mimetype.split('/')[1].trim()) 
  }
})

var upload = multer({ storage: storage });



app.set('port',3000);

app.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
app.use(upload.any());
app.use('/api',routes);

// app.get('/', function(req,res){
// 	res
// 		.status(200)
// 		.sendFile(path.join(__dirname, "public", "index.html"));
// });
app.get('/:galleryName',function(req,res){
	res
		.status(200)
		.sendFile(path.join(__dirname,"public","index.html"))
})


var server = app.listen(app.get('port'), function(){
	var port = server.address().port;

	console.log("server started on port  " + port);
});