(function() {
    var app, fs, config, serveStatic, AWS, s3, express;
	express=require('express');

    app = express();
	fs = require('fs');
    serveStatic = require('serve-static');
    config = require('./config');
	AWS = require('AWS-sdk');

	// Create S3 Client object
	var credentials = new AWS.SharedIniFileCredentials({profile: config.awsProfile});
	AWS.config.credentials = credentials;
	s3 = new AWS.S3();

    app.use(serveStatic(config.bowerPath));
    app.use(serveStatic(config.rootPath + "/client"));

	// Configure the bucket Name
	app.get('/upload',function(req,res) {
		// Local Path
		var filename = 'hello-world.txt';
		var localPath = __dirname + '/../client/upload_files/' + filename;
		
		// S3 Key path
		var keyName = '1/' + filename;

		// Create fileStream to localPath
		fs.readFile(localPath, function(err, data) {
			if(err) {
				console.log(err);
				res.status(404).send(err);
			}

			var base64Data = new Buffer(data, 'binary');

			var params = {Bucket: config.bucketName, Key: keyName, Body: base64Data, ACL: 'public-read'};
			s3.putObject(params, function(err, data) {
				if (err) {
					console.log(err)
					res.status(404).send(err);
				}
				else
				{
					console.log("Successfully uploaded data to http://s3.amazonaws.com/" + bucketName + "/" + keyName);
					res.status(200).send('success');
				}
			});
		});
	});
    app.listen(process.env.PORT || 3000);
    console.log("Listening on http://localhost:" + (process.env.PORT || '3000') );


}).call(this);


