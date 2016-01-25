(function () {
    var app, fs, config, serveStatic, express, utils, path;
    var bodyParser, cookieParser, multer, upload;
    var db;
    express = require('express');
    path = require('path');
    app = express();

    fs = require('fs');
    serveStatic = require('serve-static');
    config = require('./config');
    app.use(serveStatic(config.bowerPath));
    app.use(serveStatic(config.rootPath + "/client"));

    db = require('./dynamo');
    utils = require('./aws-services');
    multer = require('multer');


    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    });
    var upload = multer({storage: storage});

    app.post('/notification', function (req, res) {
        var body = req.body;
        if (body.state === 'PROGRESSING') {
            console.log(body);
            res.status(200);
        }
        else if (body.state === 'COMPLETED') {
            console.log(body);
            res.status(200);
        }
        else {
            console.log(body);
            res.status(200);
        }
    });

    // Configure the bucket Name
    app.post('/api/upload', upload.fields([{name: 'file', maxCount: 1}]), function (req, res) {
        var videoId = req.files.file[0].filename; // VideoId in dynamo , it is also the file name in uploads
		console.log(videoId);
        var originalName = req.files.file[0].originalname;
		console.log(originalName);

        var rawExtension = path.extname(originalName).split('.');
        var extension = rawExtension[rawExtension.length - 1];
        if (config.allowedFileExtension.indexOf(extension) > -1) {
            try {

                // Insert into DB
                db.insertVideo({
                    file: req.files.file[0],
                    info: req.body.info
                });
                res.status(200).send('success');
            }
            catch (err) {
                console.log(err);
                throw Error("Database error");
            }

            // Upload the file to S3
            //TODO: Chintan needs to update this

        /*    var localPath = __dirname + './uploads/' + videoId;
            var fileName = path.basename(localPath);
            var awsFilePath = (Math.ceil(Math.random() * (1000000000 - 100000) + 100000)) + '/' + fileName;

            utils.s3Upload(localPath, awsFilePath, function (err, result) {
                if (err) {
                    console.log(err);
                    //TODO: Socket Message
                }
                db.changeStatus(videoId, 'Uploaded to S3');
                // Start the Transcoding service
                utils.transcode(awsFilePath, fileName, function (err, data) {
                    if (err) {
                        console.log(err);
                        //TODO: Socket message
                    }
                    //TODO: Socket message
                })
                //TODO: Socket message
            });*/
        } else {
            res.status(404).send('File type not allowed');
        }
    });


    app.listen(process.env.PORT || 3000);
    console.log("Listening on http://localhost:" + (process.env.PORT || '3000'));

}).call(this);


