(function(){
    angular.module('videeooApp')
        .controller('home', HomeController);

    HomeController.$inject=['$scope'];

    function HomeController($scope){
        $scope.content="This is a test content";
    }
})();
