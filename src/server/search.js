var dynamo = require('./dynamo');

module.exports = {
    init: init
};

function init(app) {
    app.get('/api/search', function (req, res, next) {
        var term = req.query.term;
        dynamo.getVideos(term, function (result) {
            res.send(result);
        });
    });
    app.get('/api/video/:videoId', function (req, res, next) {
        var term = req.params.videoId;
        dynamo.getById(term, function (result) {
            res.send(result);
        });
    });
}