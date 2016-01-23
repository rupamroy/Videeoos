(function () {
    angular.module('videeooApp')
        .factory('uploadService', uploadFactory);

    uploadFactory.$inject = ['Upload'];

    function uploadFactory(Upload) {
        return {
            upload: upload
        }

        function upload(fd, cb, errCb) {
            return Upload.upload(fd);
        }
    }
})();
