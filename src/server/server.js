(function () {
    var app, fs, config, serveStatic, express, utils;
    express = require('express');

    app = express();
    fs = require('fs');
    serveStatic = require('serve-static');
    config = require('./config');


    app.use(serveStatic(config.bowerPath));
    app.use(serveStatic(config.rootPath + "/client"));

    // Configure the bucket Name
    app.get('/upload', function (req, res) {
        // Local Path
        var localPath = __dirname + '/../client/media/hello-world.txt';

		require('./utils')(localPath, function(err, result){
			if(err) {
				console.log(err);
				res.status(404).send(err);
			}
			res.status(200).send(result);
		});
    });

    app.listen(process.env.PORT || 3000);
    console.log("Listening on http://localhost:" + (process.env.PORT || '3000'));

}).call(this);


