/**
 * Created by rafa on 27/08/2016.
 */
app.controller("FacebookController", function ($scope, $http, $location) {

    $scope.facebook = localStorage.getItem("facebook");

    $scope.processar = function(facebook){
        if(facebook) {
            localStorage.setItem("facebook", facebook);
            localStorage.setItem("user", facebook);
            localStorage.removeItem("whatsapp");
            $location.path('/cep');
        }
    }
});
