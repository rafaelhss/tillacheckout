app.controller("EditarController", function ($scope, $http, TillaConfig, $routeParams,  $mdDialog, $location) {


    $scope.clearId = function(){
        $scope.editok = false;
    }


    $http.get(TillaConfig.apiUrl + "/produto/" + $routeParams.id)
        .then(function(result){
            $scope.novoproduto = result.data;
            if($scope.novoproduto.imagens != undefined){
                $scope.novoproduto.imgurl = $scope.novoproduto.imagens[0].url;
            }
        },function(erro){
            console.log(erro.status);
            console.log(erro)
            $scope.error = erro.status;
        } )

    $scope.salvar = function(produto){

        produto.id = undefined;
        produto.imagens = [{url:produto.imgurl, autor: "tillaviana", data: new Date()}];




        $scope.carregando = true;
        $scope.error = undefined;

        $http.put(TillaConfig.apiUrl + "/produto/" + $routeParams.id, produto )
            .then(function(result){
                console.log(result.data);
                $scope.novoproduto = result.data;
                $scope.editok = true;
            }, function(erro){
                console.log(erro.status);
                console.log(erro)
                $scope.error = erro.status;
            })
            .then(function(){
                $scope.carregando = false;
            })

    }


    $scope.showConfirm = function(produto) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Deletar produto?')
            .textContent('Tem certeza que deseja deletar "' + produto.nome + '"')
            .ariaLabel('Deletar')
            //.targetEvent(ev)
            .ok('Sim')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(function() {
            $scope.carregando = true;
            $http.delete(TillaConfig.apiUrl + "/produto/" + $routeParams.id)
                .then(function(result){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Produto removido')
                            .textContent('Produto removido com sucesso')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('OK')

                    ).then(function(){
                            $location.path("/")
                        });
                },function(erro){
                    console.log(erro.status);
                    console.log(erro)
                    $scope.error = erro.status;
                })
                .then(function(){
                    $scope.carregando = false;
                })

        }, function() {

        });
    };



});
