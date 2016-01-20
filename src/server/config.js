(function() {
    var path, rootPath, bowerPath;

    path = require('path');

    rootPath = path.normalize(__dirname + '/../');
    bowerPath=path.normalize(__dirname + '/../../bower_components');
    module.exports = {
        rootPath: rootPath,
        bowerPath: bowerPath

    };

}).call(this);