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
        next();
    });
}