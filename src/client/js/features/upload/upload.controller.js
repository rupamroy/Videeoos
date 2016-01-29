(function(){
    angular.module('videeooApp')
        .controller('upload', UploadController);

    UploadController.$inject=['$scope', '$location', '$timeout', 'uploadService'];

    function UploadController($scope, $location, $timeout, uploadService){
        $scope.submit = submit;
        $scope.title = '';
        $scope.validationError = null;
        function submit(){
            try {
                if ($scope.videoFile) {
                    $scope.validationError = null;
                    $scope.loading = true;
                    uploadService.upload({
                        url: '/api/upload', //node.js route
                        data: {
                            file: $scope.videoFile,
                            info: {
                                title: $scope.title,
                                keywords: $scope.keywords
                            }
                        }
                    }).then(function (resp) {
                        $scope.loading = false;
                        $location.path('/upload-success');
                    }, function (resp) {
                        $scope.loading = false;
                        $timeout(function(){
                            $scope.validationError = resp.data;
                            $scope.$apply();
                        });
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log(Math.random() + "-" +  progressPercentage);
                        $scope.progress = progressPercentage;
                    });
                }
            }
            catch(err){
                console.log("Error in uploading file...");
                console.log(err);
                $location.path('/error');
            }

        }
    }
})();
