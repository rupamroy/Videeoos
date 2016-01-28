(function () {
    angular.module('videeooApp')
        .controller('videoController', VideoController);

    VideoController.$inject = ['$scope', '$routeParams', 'videoService', '$location'];

    function VideoController($scope, $routeParams, videoService, $location) {
        var term = $routeParams.videoId;

        if (term) {
            videoService.get(term)
                .then(function (result) {
                    $scope.item = result.Items[0];
                    if (result.Count) {
                        hdwplayer({
                            id: 'player',
                            swf: 'js/vendor/player/player.swf',
                            width: '100%',
                            height: '400',
                            type: 'rtmp',
                            streamer: 'rtmp://siiblitjqj40p.cloudfront.net/cfx/st',
                            video: result.Items[0].CDNLocation[0],
                            autoStart: 'false'
                        });
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })

        }
	$scope.search = function(){
            $location.path('/search').search({term: $scope.term});
        }
    }
})();
