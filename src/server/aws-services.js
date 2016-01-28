var fs = require('fs');
var AWS = require('aws-sdk');
var config = require('./config');
var path = require('path');
var db = require('./dynamo');

var s3 = new AWS.S3();
var elastictranscoder = new AWS.ElasticTranscoder();

module.exports = {
    s3Upload: function (localFilePath, awsFilePath, cb) {
        // Create fileStream to localPath
        fs.readFile(localFilePath, function (err, data) {
            if (err) {
                cb(err);
            }
            if (data) {
                var base64Data = new Buffer(data, 'binary');
                var params = { Bucket: config.aws.s3.bucketName, Key: awsFilePath, Body: base64Data, ACL: 'public-read' };
                s3.putObject(params, function (err, data) {
                    if (err) {
                        cb(err);
                    }
                    else {
                        console.log('Successfully uploaded data to http://s3.amazonaws.com/' + config.aws.s3.bucketName + '/' + awsFilePath);
                        cb(null, data);
                    }
                });
            }
        });
    },
    transcode: function (awsFilePath, fileName, cb) {
        var params = {
            PipelineId: config.aws.elastictranscoder.PipelineId,
            Input: {
                Key: awsFilePath + '/' + fileName
            },
            Outputs: [],
	    UserMetadata: {
		VideoId: fileName
	    }
        };

        var cdn = [];

        for (var presetId in config.aws.elastictranscoder.PresetIds) {
            params.Outputs.push({
                Key: awsFilePath + '/' + config.aws.elastictranscoder.PresetIds[presetId] + '/' + fileName + '.mp4',
                PresetId: config.aws.elastictranscoder.PresetIds[presetId],
                ThumbnailPattern : awsFilePath + '/' + config.aws.elastictranscoder.PresetIds[presetId] + '/' + fileName + '-{count}'
            });
            cdn.push(awsFilePath + '/' + config.aws.elastictranscoder.PresetIds[presetId] + '/' + fileName + '.mp4');
        }

        elastictranscoder.createJob(params, function (err, data) {
            if (err) {
                cb(err);
            }
            var params = {
                Key: {
                    'VideoId': fileName
                },
                UpdateExpression: 'SET UploadStatus = :status, CDNLocation = :location, ThumbLocation = :thumbLocation',
                ExpressionAttributeValues: {
                    ':status': 'CDN_UPDATED',
                    ':location': cdn,
                    ':thumbLocation' : awsFilePath + '/' + config.aws.elastictranscoder.PresetIds[presetId] + '/' + fileName + '-00001.png'
                },
                ReturnValues: 'ALL_NEW'
            };
            db.update(params, function(err,response) {
                cb(null, data);
            });
        });
    }
};
