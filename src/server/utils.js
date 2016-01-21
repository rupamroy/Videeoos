var fs = require('fs');
var AWS = require('aws-sdk');
var config = require('./config');
var path = require('path');

// Create S3 Client object
AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: config.awsProfile     });
var s3 = new AWS.S3();

module.exports = function(filePath, cb) {
	var filename = path.basename(filePath); 
	var keyName = '1/' + filename;

	// Create fileStream to localPath
	fs.readFile(filePath, function (err, data) {
		if (err) {
			cb(err);
		}
		if(data) {
			var base64Data = new Buffer(data, 'binary');
			var params = { Bucket: config.bucketName, Key: keyName, Body: base64Data, ACL: 'public-read' };
			s3.putObject(params, function (err, data) {
				if (err) {
					cb(err);
				}
				else {
					console.log("Successfully uploaded data to http://s3.amazonaws.com/" + bucketName + "/" + keyName);
					cb(null,data);
				}
			});
		}
	});
}
