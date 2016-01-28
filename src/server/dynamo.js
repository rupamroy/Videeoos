var AWS = require('aws-sdk');
var config = require('./config');

var dynamoDBClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    insertVideo: insertVideo,
    changeStatus: changeStatus,
    getVideos: getVideos,
    getById: getById,
    update: update
};

function insertVideo(data) {
    var params = {
        TableName: 'Videos',
        Item: {
            'VideoId': data.file.filename,
            'VideoName': data.file.originalname,
            'Title': data.info.title,
            'Keywords': data.info.keywords,
            'UploadStatus': 'UPLOAD_LOCAL',
            'Created': (new Date()).toString(),
            'Modified': (new Date()).toString()
        }
    };

    dynamoDBClient.put(params, function (err, result) {
        if (err) {
            console.error('Unable to add Video info', 'Error JSON: ', JSON.stringify(err, null, 2));
        } else {
            console.log('PutItem Succeeded:', data.file.filename)
        }
    });
}

function changeStatus(videoId, status) {
    var params = {
        TableName: 'Videos',
        Key: {
            'VideoId': videoId
        },
        UpdateExpression: 'SET UploadStatus = :status',
        ExpressionAttributeValues: {
            ':status': status
        },
        ReturnValues: 'ALL_NEW'
    };

    dynamoDBClient.update(params, function (err, data) {
        if (err)
            console.log(JSON.stringify(err, null, 2));
        else
            console.log(JSON.stringify('Video ID: ' + videoId + ' , status changed to ' + status));
    });
}

function getVideos(term, cb) {
    var params = {
        TableName: 'Videos',
    };

    if (term) {
        params.FilterExpression = 'contains(Title, :title)'
        params.ExpressionAttributeValues = {
            ':title': term
        }
    }
    dynamoDBClient.scan(params, function (err, data) {
        if (err)
            throw err;
        else
            cb(data);
    });
}

function getById(videoId, cb) {
    if (videoId) {
        var params = {
            TableName: 'Videos',
            KeyConditionExpression: '#VideoId = :VideoId',
            ExpressionAttributeNames: {
                '#VideoId': 'VideoId'
            },
            ExpressionAttributeValues: {
                ':VideoId': videoId
            }
        };
        dynamoDBClient.query(params, function (err, data) {
            if (err)
                throw err;
            else
                cb(data);
        });
    }
}

function update(params, cb) {
    params.TableName = 'Videos';

    dynamoDBClient.update(params, function (err, data) {
        if (err) {
            console.log(JSON.stringify(err, null, 2));
        }
        console.log('Updated the values');
        cb(null, params);
    });
}
