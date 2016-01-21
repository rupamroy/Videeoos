(function () {
    var app, fs, config, serveStatic, express, utils, path;
    express = require('express');
    path = require('path');

    app = express();
    fs = require('fs');
    serveStatic = require('serve-static');
    config = require('./config');
    utils = require('./utils');


    app.use(serveStatic(config.bowerPath));
    app.use(serveStatic(config.rootPath + "/client"));

    // Configure the bucket Name
    app.get('/upload', function (req, res) {
        // Local Path
        var localPath = __dirname + '/../client/media/hello-world.txt';
		var rawExtension = path.extname(localPath).split('.');
		var extension = rawExtension[rawExtension.length - 1];
		if(config.allowedFileExtension.indexOf(extension) > -1) {
			utils.s3Upload(localPath, function(err, result){
				if(err) {
					console.log(err);
					res.status(404).send(err);
				}
				res.status(200).send(result);
			});
		} else {
			res.status(404).send('File type not allowed');
		}
    });

    app.listen(process.env.PORT || 3000);
    console.log("Listening on http://localhost:" + (process.env.PORT || '3000'));

}).call(this);


