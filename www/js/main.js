(function () {
 
    var parseService = function ($http) {
 
        return {

            getParse: function () {
 
                var parseWebpage = function (response) {
 
                    var tmp = document.implementation.createHTMLDocument();
                    tmp.body.innerHTML = response.data;
 
                    var items = $(tmp.body.children).find(' ');
 
                    return items;
                }
 
                return $http.get('http://www.nytimes.com/2013/08/28/us/the-lasting-power-of-dr-kings-dream-speech.html')
                            .then(parseWebpage);
            }
        }
    };

    var myController = function ($scope, $http, parseService) {
 
        $scope.click = function () {

            parseService.getParse().then(
            function (response) {
                $scope.items = response;

            });
 
        }
 
    };

    var myApp = angular.module('myApp', []);
 
    myApp.config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    });
 
    myApp.factory('parseService', ['$http', parseService]);
    myApp.controller('myController', ['$scope', '$http', 'parseService', myController]);
 
})();