var AWS = require("aws-sdk");
var config = require('./config');

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: config.awsProfile     });
AWS.config.region = config.aws.region;
AWS.config.endpoint = config.aws.dynamo.endpoint;

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    insertVideo: insertVideo,
    changeStatus: changeStatus
};

function insertVideo(data) {
    var params = {
        TableName: "Videos",
        Item: {
            "VideoId": data.file.filename,
            "VideoName": data.file.originalname,
            "Title": data.info.title,
            "Keywords": data.info.keywords,
            "UploadStatus": "Uploaded to local server",
            "Created": (new Date()).toString(),
            "Modified": (new Date()).toString()
        }
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add Video info", ".Error JSON: ", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem Succeeded:", "Sample.mp4")
        }
    });
}

function changeStatus(videoId, status) {
    var params = {
        TableName: "Videos",
        Key: {
            "VideoId": "No One You Know",
        },
        UpdateExpression: "SET UploadStatus = :status",
        ExpressionAttributeValues: {
            ":status": status
        },
        ReturnValues: "ALL_NEW"
    };

    docClient.update(params, function (err, data) {
        if (err)
            console.log(JSON.stringify(err, null, 2));
        else
            console.log(JSON.stringify("Video ID " + videoId + " , status changed to " + status));
    });
}
