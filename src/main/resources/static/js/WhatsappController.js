/**
 * Created by rafa on 27/08/2016.
 */
app.controller("WhatsappController", function ($scope, $http, $location) {
    $scope.validarWhatsapp = function(whatsapp) {
        $scope.whatsappinvalido = true;
        if(whatsapp.length >= 10 && whatsapp.length <= 11){
            $scope.whatsappinvalido = false;
        }
    }
    $scope.processar = function(whatsapp){
        if(!$scope.whatsappinvalido) {
            localStorage.setItem("whatsapp", whatsapp);
            localStorage.setItem("user", whatsapp);
            localStorage.removeItem("facebook");
            $location.path('/cep');
        }
    }
});
