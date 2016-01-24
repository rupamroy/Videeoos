var io;
var socket;

module.exports = {
    init: init,
    error: error,
    info: info,
    warn: warn
};

function init(http) {
    io = require('socket.io')(http);

    io.on('connection', function (socket) {
        console.log('a user connected');
    });
}

function error(message) {
    io.emit('error', message)
}

function info(message) {
    io.emit('info', message)
}

function warn(message) {
    io.emit('warn', message)
}