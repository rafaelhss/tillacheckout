/**
 * Created by rafa on 27/08/2016.
 */

app.controller("NovaVendaController", function ($scope, $http, $location, TillaConfig, fileUpload) {

    $scope.criarVenda = function(venda){

         $scope.carregando = true;

        $http.post(TillaConfig.apiUrl + "/vendapendente", venda)
        .then(function(data){
             $scope.carregando = false;

            console.log(data)
            $scope.venda = data.data;
            $scope.venda.link = TillaConfig.baseurl + "/vendapendente/novavenda.html#?codigo=" + $scope.venda.codigo;
            $scope.venda.criada = true;
        }, function(error){
            console.log(error)
             $scope.carregando = false;

        })

    }

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
