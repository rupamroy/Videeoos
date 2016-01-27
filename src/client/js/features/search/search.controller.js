(function () {
    angular.module('videeooApp')
        .controller('search', SearchController);

    SearchController.$inject = ['$scope', '$routeParams','$location', 'searchService'];

    function SearchController($scope, $routeParams, $location, searchService) {
        var term = $routeParams.term;
        var rows = [];
        searchService.query(term).then(function (result) {
            var row = [];
            result.data.Items.forEach(function (item, index) {
                item.Created = Date.parse(item.Created);
                row.push(item);
                if ((index + 1) % 3 === 0) {
                    rows.push(row);
                    row = [];
                }
            });
            if (row.length > 0) {
                rows.push(row);
            }

            $scope.videos = rows;
        });

        $scope.search = function(){
            $location.path('/search').search({term: $scope.term});
        }
    }
})();
