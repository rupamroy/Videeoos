(function () {
    angular.module('videeooApp')
        .filter('parseDate', ParseDate);

    function ParseDate() {
        return function(input){
            return new Date(input);
        }
    }
})();

