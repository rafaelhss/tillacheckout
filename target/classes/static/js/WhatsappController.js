/**
 * Created by rafa on 27/08/2016.
 */
app.controller("WhatsappController", function ($scope, $http, $location) {

    $scope.whatsapp = localStorage.getItem("whatsapp");


    var cleanZap = function(whatsapp){
        return whatsapp.replace(/\D/g,'');
    }
    $scope.validarWhatsapp = function(whatsapp) {
        $scope.whatsappinvalido = true;
        if(cleanZap(whatsapp).length >= 10 && cleanZap(whatsapp).length <= 11){
            $scope.whatsappinvalido = false;
        }
    }
    $scope.processar = function(whatsapp, nome){
        if(!$scope.whatsappinvalido) {
            localStorage.setItem("whatsapp", cleanZap(whatsapp));
            localStorage.setItem("contato", cleanZap(whatsapp));
            localStorage.setItem("nome", nome);
            localStorage.removeItem("facebook");
            $location.path('/cep');
        }
    }
});
