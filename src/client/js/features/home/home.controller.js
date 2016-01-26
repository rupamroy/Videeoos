(function(){
     angular.module('videeooApp')
         .controller('home', HomeController);

     HomeController.$inject=['$scope', '$location'];

     function HomeController($scope, $location){
        $scope.search = function(){
            $location.path('/search').search({term: $scope.term});
        }
     }
})();
