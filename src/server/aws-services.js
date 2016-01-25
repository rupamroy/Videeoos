var fs = require('fs');
var AWS = require('aws-sdk');
var config = require('./config');
var path = require('path');

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
                        console.log("Successfully uploaded data to http://s3.amazonaws.com/" + config.aws.s3.bucketName + "/" + awsFilePath);
                        cb(null, data);
                    }
                });
            }
        });
    },
    transcode: function(awsFilePath,fileName,cb) {
        var params = {
            PipelineId: config.aws.elastictranscoder.PipelineId,
            Input : {
                Key: awsFilePath + '/' + fileName
            },
            Outputs: []
        };


        for(var presetId in config.aws.elastictranscoder.PresetIds) {
           params.Outputs.push({
                Key: awsFilePath + '/' + config.aws.elastictranscoder.PresetIds[presetId] + '/' + fileName,
                PresetId : config.aws.elastictranscoder.PresetIds[presetId]
            });
        }

        elastictranscoder.createJob(params, function(err, data){
           if(err) {
               cb(err);
           }
           else {
               cb(null, data);
           }
        });
    }
};
