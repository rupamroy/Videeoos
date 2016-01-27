(function () {
    angular.module('videeooApp')
        .controller('videoController', VideoController);

    VideoController.$inject = ['$scope', '$routeParams', 'videoService'];

    function VideoController($scope, $routeParams, videoService) {
        var term = $routeParams.videoId;

        if (term) {
            videoService.get(term)
                .then(function (result) {
                    $scope.item = result;
                    if (result.Count) {
                        console.log(result.Items[0].CDNLocation[0]);
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
    }
})();
