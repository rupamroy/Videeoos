(function () {
    angular.module('videeooApp')
        .directive('notify', NotifyDirective);

    NotifyDirective.$inject = ['socket'];

    function NotifyDirective(socket) {
        return {
            restrict: 'EA',
            scope: true,
            controller: function () {
                socket.on('info', function (message) {
                    toastr.info(message, "Videeoo");
                });

                socket.on('warn', function (message) {
                    toastr.warning(message, "Videeoo")
                });

                socket.on('error', function (message) {
                    toastr.error(message, "Videeoo");
                });
            }
        }

    }
})();

