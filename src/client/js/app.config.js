(function(){
     angular.module('videeooApp').config(Config);

     Config.$inject=['$routeProvider'];

     function Config($routeProvider){
         $routeProvider
             .when('/home',{
                 templateUrl:'js/features/home/home.html',
                 controller: 'home'
             })
             .when('/upload',{
                 templateUrl: 'js/features/upload/upload.html',
                 controller: 'upload'
             })
             .when('/error',{
                 templateUrl: 'js/features/error/error.html',
                 controller: 'error'
             })
             .when('/upload-success',{
                 templateUrl: 'js/features/upload-success/upload-success.html',
                 controller: 'uploadSuccess'
             })
             .otherwise('/home');
     }
})();