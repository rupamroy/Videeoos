(function () {
    var path, rootPath, bowerPath;

    path = require('path');

    rootPath = path.normalize(__dirname + '/../');
    bowerPath = path.normalize(__dirname + '/../../bower_components');
    bucketName = 'videostream.dhd.com';
    profile = 'dhd-account';
    module.exports = {
        rootPath: rootPath,
        bowerPath: bowerPath,
        awsProfile: profile,
        bucketName: bucketName
    };

}).call(this);
