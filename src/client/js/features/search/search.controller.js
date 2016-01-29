(function () {
    angular.module('videeooApp')
        .controller('search', SearchController);

    SearchController.$inject = ['$scope', '$routeParams','$location', 'searchService'];

    function SearchController($scope, $routeParams, $location, searchService) {
        var term = $routeParams.term;
        var rows = [];
        searchService.query(term).then(function (result) {
            $scope.videos = result.data.Items;
        });

        $scope.search = function(){
            $location.path('/search').search({term: $scope.term});
        }
    }
})();
