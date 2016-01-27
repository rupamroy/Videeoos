var AWS = require('aws-sdk');
var config = require('./config');
var path = require('path');

// Create S3 Client object
AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: config.awsProfile });
AWS.config.region = config.aws.region;
AWS.config.apiVersions = {
	dynamodb: '2012-08-10',
	elastictranscoder: '2012-09-25',
	s3: '2006-03-01'
};
module.exports = AWS;
