(function () {
    angular.module('videeooApp')
        .factory('videoService', videoService);

    videoService.$inject = ['$http', '$q'];

    function videoService($http, $q) {
        return {
            get: get
        };

        function get(term) {
            var url = 'api/video/' + term;
            return $http.get(url)
            .then(succcessCallback)
            .catch(errorCallback);

            function succcessCallback(result) {
                return result.data;
            }

            function errorCallback(error) {
                return $q.reject(error);
            }
        }
    }
})();

