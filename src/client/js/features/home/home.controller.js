(function () {
    angular.module('videeooApp')
        .controller('home', HomeController);

    HomeController.$inject = ['$scope', '$location', 'homeService'];

    function HomeController($scope, $location, homeService) {
        $scope.search = function () {
            $location.path('/search').search({term: $scope.term});
        };

        homeService.query().then(function (res) {
            $scope.videos = res.data.Items;
        });
    }
})();
