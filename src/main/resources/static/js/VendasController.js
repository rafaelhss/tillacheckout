/**
 * Created by rafa on 27/08/2016.
 */

app.controller("VendasController", function ($scope, $http, $location, TillaConfig, fileUpload) {

    $scope.imgChanged = Math.random();// gambiarra pra recarregar a imagem quando upload

    $scope.fileClick = function (venda){
        console.log('fileClick:' + venda);
        $scope.fileClicked = venda;
    }


    $http.get(TillaConfig.adminUrl + "/vendas")
        .then(function (response){
            $scope.vendas = response.data.content;
            $scope.url = TillaConfig.adminUrl;
        },function (response){
            console.log('Erro ao buscar vendas');
            console.log(response.status);
        });


    $scope.uploadFile3 = function(venda, index){
        var codigo = venda.codigo;
        var file = $scope.file;


        var fd = new FormData();
        fd.append('file', file);


        console.log('myFile1 is ' );
        console.dir(file);
        console.log(codigo);
        var uploadUrl = TillaConfig.adminUrl +
            '/vendas/' + codigo + '/comprovantes-pac/';

        console.log("uploadUrl:" + uploadUrl);
        fileUpload.uploadFileToUrl(fd, uploadUrl, $scope);
        $scope.file = undefined;
        $scope.imgChanged = Math.random();

        if($scope.vendas[index].comprovantePac == null) {
            $scope.vendas[index].comprovantePac = true;
        }

    };




    var changeStatus = function(operacao, codigoVenda, index){

        $scope.changingStatus = true;
        $http.get(TillaConfig.adminUrl + "/vendas/" + codigoVenda + "/" + operacao)
            .then(function (response){
                console.log("oiss");
                $scope.vendas[index] = response.data;
                $scope.url = TillaConfig.adminUrl;
                $scope.changingStatus = false;
            },function (response){
                console.log('Erro ao buscar vendas');
                console.log(response.status);
                $scope.changingStatus = false;
            });
    }

    $scope.forwardStatus = function(codigoVenda, index){
        console.log("oi");
        changeStatus("forwardStatus", codigoVenda, index);
    }
    $scope.backwardStatus = function(codigoVenda, index){
        changeStatus("backwardStatus", codigoVenda, index);
    }




});
