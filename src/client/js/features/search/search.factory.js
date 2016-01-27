(function () {
    angular.module('videeooApp')
        .factory('searchService', searchFactory);

    searchFactory.$inject = ['$http', 'Upload'];

    function searchFactory($http, Upload) {
        return {
            query: query
        };

        function query(term) {
            var url= 'api/search';
            if(term){
                url = url + '?term=' + term;
            }
            return $http.get(url);
        }
    }
})();

