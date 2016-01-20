(function(){
     angular.module('myApp')
         .controller('myCtrl', MyCtrl);

     MyCtrl.$inject=['$scope'];

     function MyCtrl($scope){
        $scope.content="This is a test content";
     }
})();