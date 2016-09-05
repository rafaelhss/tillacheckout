/**
 * Created by rafa on 27/08/2016.
 */


app.controller("EtiquetaController", function ($scope, $http, $location, TillaConfig) {


    var codigoVenda = $location.search().codigoVenda;

    if (codigoVenda != undefined) {

        $http.get(TillaConfig.adminUrl + "/vendas/" + $scope.codigoVenda)
            .then(function (response) {
                $scope.venda = response.data;
            }, function (response) {
                console.log('Erro ao buscar vendas');
                console.log(response.status);
            });
    }
});
