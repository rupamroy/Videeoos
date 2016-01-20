(function() {
    var app, config, serveStatic;
    var express=require('express');
    app=express();
    serveStatic=require('serve-static');


    config=require('./config');
    app.use(serveStatic(config.bowerPath));
    app.use(serveStatic(config.rootPath + "/client"));

    app.listen(process.env.PORT || 3000);
    console.log("Listening on http://localhost:" + (process.env.PORT || '3000') );


}).call(this);


