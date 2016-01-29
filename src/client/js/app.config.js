(function(){
     angular.module('videeooApp').config(Config);

     Config.$inject=['$routeProvider'];

     function Config($routeProvider){
         $routeProvider
             .when('/home',{
                 templateUrl:'js/features/search/search.html',
                 controller: 'search'
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
             .when('/video/:videoId',{
                 templateUrl:'js/features/video/video.html',
                 controller: 'videoController'
             })
             .when('/search',{
                 templateUrl:'js/features/search/search.html',
                 controller: 'search'
             })
             .otherwise('/search');
     }
})();