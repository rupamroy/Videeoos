var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    insertVideo: insertVideo,
    changeStatus: changeStatus
}

function insertVideo(data) {
    var params = {
        TableName: "Videos",
        Item: {
            "VideoId": data.file.filename,
            "VideoName": data.file.originalname,
            "Title": data.info.title,
            "Keywords": data.info.keywords,
            "Status": "Uploaded to local server"
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
        UpdateExpression: "SET Status = :status",
        ExpressionAttributeValues: {
            ":label": status
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