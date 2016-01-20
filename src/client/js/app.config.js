(function(){
     angular.module('myApp').config(Config);

     Config.$inject=['$routeProvider'];

     function Config($routeProvider){
         $routeProvider
             .when('/home',{
                 templateUrl:'js/home.html',
                 controller: 'myCtrl'
             })
             .otherwise('/home');

     }
})();