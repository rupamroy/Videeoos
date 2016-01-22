(function () {
    var path = require('path');
    var rootPath = path.normalize(__dirname + '/../');
    var bowerPath = path.normalize(__dirname + '/../../bower_components');
    var bucketName = 'videostream.dhd.com';
    var profile = 'dhd-account';
    var PipelineId = '1453329131872-3ukrkf';
    var allowedFileExtension = ['txt', '3gp', 'aac', 'asf', 'avi', 'divx', 'flv', 'm4a', 'mkv', 'mov', 'mp3', 'mp4', 'mpeg', 'mpeg-ps', 'mpeg-ts', 'mxf', 'ogg', 'vob', 'wav', 'webm'];
    var PresetIds = [
        '1351620000001-000020',
        '1351620000001-000010',
        '1351620000001-000040'
    ];

    module.exports = {
        rootPath: rootPath,
        bowerPath: bowerPath,
        awsProfile: profile,
        aws: {
            region: 'us-east-1',
            elastictranscoder: {
                PipelineId: PipelineId,
                PresetIds: PresetIds
            },
            s3:{
                bucketName: bucketName
            }
        },
        allowedFileExtension: allowedFileExtension
    };

}).call(this);
