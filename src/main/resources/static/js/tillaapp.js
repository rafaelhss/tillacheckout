
var app = angular.module("tillaApp", ['ngRoute', 'ngDialog', 'ng-file-model']);

app.service('TillaConfig',function(){
    this.apiUrl = "http://localhost:8080/api";
    this.adminUrl = "http://localhost:8080/admin";
});


app.controller("tillaCtrl", function ($scope, $http) {


});


app.directive('selectOnClick', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$window.getSelection().toString()) {
                    // Required for mobile Safari
                    this.setSelectionRange(0, this.value.length)
                }
            });
        }
    };
}]);


app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/whatsapp', {
            templateUrl: 'html/whatsapp.html',
            controller: 'WhatsappController'
        })
        .when('/facebook', {
            templateUrl: 'html/facebook.html',
            controller: 'FacebookController'
        })
        .when('/cep', {
            templateUrl: 'html/cep.html',
            controller: 'CepController'
        })
        .when('/produtos', {
            templateUrl: 'html/produtos.html',
            controller: 'ProdutosController'
        })
        .when('/comprovante', {
            templateUrl: 'html/comprovante.html',
            controller: 'ComprovanteController'
        })
        .when('/login', {
            templateUrl: 'html/login.html',
            controller: 'LoginController'

        })
        .otherwise({
            templateUrl: 'html/home.html'
        });




//    $locationProvider.html5Mode(true);
});
