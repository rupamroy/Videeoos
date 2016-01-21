(function () {
    var path, rootPath, bowerPath;

    path = require('path');

    rootPath = path.normalize(__dirname + '/../');
    bowerPath = path.normalize(__dirname + '/../../bower_components');
    bucketName = 'videostream.dhd.com';
    profile = 'dhd-account';
	allowedFileExtension = ['txt','mp4', 'mpeg', 'avi'];
    module.exports = {
        rootPath: rootPath,
        bowerPath: bowerPath,
        awsProfile: profile,
        allowedFileExtension: allowedFileExtension,
        bucketName: bucketName
    };

}).call(this);
