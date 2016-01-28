(function () {
    angular.module('videeooApp')
        .factory('homeService', homeFactory);

    homeFactory.$inject = ['$http'];

    function homeFactory($http) {
        return {
            query: query
        };

        function query(term) {
            var url= 'api/homeVideos';
            return $http.get(url);
        }
    }
})();

