(function(){
     angular.module('videeooApp').config(Config);

     Config.$inject=['$routeProvider'];

     function Config($routeProvider){
         $routeProvider
             .when('/home',{
                 templateUrl:'js/features/home/home.html',
                 controller: 'home'
             })
             .otherwise('/home');
     }
})();