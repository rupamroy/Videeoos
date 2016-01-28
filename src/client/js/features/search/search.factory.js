(function () {
    angular.module('videeooApp')
        .factory('searchService', searchFactory);

    searchFactory.$inject = ['$http'];

    function searchFactory($http) {
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

