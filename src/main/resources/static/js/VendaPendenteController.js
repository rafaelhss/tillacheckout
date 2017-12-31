/**
 * Created by rafa on 27/08/2016.
 */

app.controller("VendaPendenteController", function ($scope, $http, $location, TillaConfig, fileUpload) {

    console.log('$location.search()');
    console.log($location.search());

    var codigo = $location.search().codigo

    $http.get(TillaConfig.apiUrl + "/vendapendente/" + codigo)
    .then(function(data){
        $scope.venda = data.data;
    },function(error){
        console.log(error)
    })

    $scope.carregarEndereco = function(cep) {
        $scope.carregando = true;

        console.log('cep:' + cep );
        $http.get("https://api.postmon.com.br/v1/cep/" + cep.toString().replace(/\D/g,''))
            .then(function (response){
                $scope.endereco = response.data;
                $scope.cepnaoencontrado = false;
            },function (response){
                console.log(response.status);
                $scope.cepnaoencontrado = true;
                $scope.errocep = response.status ;
            })
            .then(function(){
                $scope.carregando = false;
                $scope.mostrarformendereco = true;
            });
    }


    $scope.criarVenda = function(endereco, venda){

       console.log("enviando");
       console.log(venda)
       console.log(endereco)


       $scope.carregando = true;
       $http.post(TillaConfig.apiUrl + "/vendapendente/" + venda.codigo, endereco)
       .then(function(data){
           $scope.carregando = false;
           console.log(data)
           $scope.vendaCriada = data.data;
       }, function(error){
           $scope.carregando = false;
           $scope.error = error;
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
