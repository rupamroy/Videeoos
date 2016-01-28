(function () {
    var app, http, fs, config, serveStatic, express, utils, path;
    var bodyParser, cookieParser, multer, upload;
    var SNSClient;
    var db;
    var notify;
    var AWS;
    var search;
    SNSClient = require('aws-snsclient');
    express = require('express');
    path = require('path');
    app = express();
    http = require('http').Server(app);
    fs = require('fs');
    serveStatic = require('serve-static');
    require('./aws-config');

    config = require('./config');
    notify = require('./socket');
    notify.init(http);
    search = require('./search');
    search.init(app);

    app.use(serveStatic(config.bowerPath));
    app.use(serveStatic(config.rootPath + '/client'));

    db = require('./dynamo');
    utils = require('./aws-services');
    multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    });
    var upload = multer({ storage: storage });
 
    app.post('/notification', function(req,res) {
        return client(req,res);
    });

    var client = SNSClient(function(err, message){
	if(err) {
	    console.log(err);
	}
	console.log(message.Message);
	var Message = JSON.parse(message.Message);
	var state = Message.state;
	console.log(state);

        if (state=== 'PROGRESSING') {
	    notify.info(state);
        }
        else if (state=== 'ERROR') {
	    notify.error(state);
        }
        else if (state=== 'WARNING') {
	    notify.warn(state);
        }
        else { 
	    notify.info(state);
        }
    });

    // Configure the bucket Name
    app.post('/api/upload', upload.fields([{ name: 'file', maxCount: 1 }]), function (req, res) {
        // VideoId in dynamo , it is also the file name in uploads
        var videoId = req.files.file[0].filename;
        var originalName = req.files.file[0].originalname;

        var rawExtension = path.extname(originalName).split('.');
        var extension = rawExtension[rawExtension.length - 1];
        if (config.allowedFileExtension.indexOf(extension) > -1) {
            try {

                // Insert into DB
                db.insertVideo({
                    file: req.files.file[0],
                    info: req.body.info
                });
                //res.status(200).send('success');
            }
            catch (err) {
                console.log(err);
                throw Error('Database error');
            }

            // Upload the file to S3
            var localPath = __dirname + '/uploads/' + videoId;
            var awsFilePath = path.basename(localPath);
            var keyName = path.basename(localPath);

            utils.s3Upload(localPath, awsFilePath + '/' + keyName, function (err, result) {
                if (err) {
                    console.log('s3 upload error: ', err);
                    res.status(404).send(err);
                }
                var params = {
                    Key: {
                        'VideoId': videoId
                    },
                    UpdateExpression: 'SET UploadStatus = :status, S3Location = :location',
                    ExpressionAttributeValues: {
                        ':status': 'UPLOAD_S3_SUCCESS',
                        ':location': awsFilePath + '/' + keyName
                    },
                    ReturnValues: 'ALL_NEW'
                };
                db.update(params, function (result) {
                    // Start the Transcoding service
                    utils.transcode(awsFilePath, keyName, function (err, data) {
                        if (err) {
                            //TODO: Socket message
                            console.log(err);
                            res.status(404).send(err);
                        }
                        //TODO: Socket message
                        db.changeStatus(videoId, 'TRANSCODE_STARTED');
                        res.status(200).send('success');
                    });
                });
                //TODO: Socket message
            });
        } else {
            notify.error('Bad File Type. File Type not allowed.')
            res.status(404).send('File type not allowed');
        }
    });

    http.listen(process.env.PORT || 3000, function () {
        console.log('Listening on http://localhost:' + (process.env.PORT || '3000'));
    });
}).call(this);


