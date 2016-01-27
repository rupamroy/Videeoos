(function(){
     angular.module('videeooApp')
         .controller('home', HomeController);

     HomeController.$inject=['$scope', '$location'];

     function HomeController($scope, $location){
        $scope.search = function(){
            $location.path('/search').search({term: $scope.term});
        }
        hdwplayer({
			id        : 'player',
			swf       : 'js/vendor/player/player.swf',
			width     : '100%',
			height    : '400',
			type      : 'rtmp',
			streamer  : 'rtmp://siiblitjqj40p.cloudfront.net/cfx/st',
			video     : '227048927/1351620000001-000010/Sample1.mp4',
			autoStart : 'false'
		});
     }
})();
