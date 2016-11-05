var app = angular.module("catalogoApp", ['ngMaterial', 'ngRoute']);

app.config( [
    '$compileProvider',
    function( $compileProvider )
    {
        //config para funcionar whatsapp://
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|whatsapp):/);
        $compileProvider.imgSrcSanitizationWhitelist (/^\s*(https?|ftp|file):|data:image\//);
    }
]);


var getProdutoTeste = function(nome, marca, preco, descCurta, descCompleta, descAdicional,  imgurl, quantidadebh, quantidadebsb){
    var produto = {};
    produto.nome = nome;
    produto.marca = marca;
    produto.descCurta = descCurta;
    produto.descCompleta = descCompleta;
    produto.descAdicional = descAdicional;
    produto.preco = preco;
    produto.imgurl = imgurl;
    produto.quantidadebh = quantidadebh;
    produto.quantidadebsb = quantidadebsb;

    return produto;
}


app.filter('tudo', function () {
    return function (produtos, texto, embh, embsb) {
        if(texto != undefined && texto.trim().length > 0) {
            var items = {
                txt: texto,
                out: []
            };
            angular.forEach(produtos, function (produto, key) {
                var palavras = this.txt.split(" ");
                var itens = this;
                palavras.forEach(function (palavra) {
                    console.log('produto.quantidadebh :' + produto.quantidadebh )
                    console.log('produto.quantidadebsb :' + produto.quantidadebsb )
                    if (
                        (produto.nome.toLowerCase().indexOf(palavra.toLowerCase()) > 0) ||
                        (produto.descCurta.toLowerCase().indexOf(palavra.toLowerCase()) > 0) ||
                        (produto.descCompleta.toLowerCase().indexOf(palavra.toLowerCase()) > 0) ||
                        (produto.descAdicional.toLowerCase().indexOf(palavra.toLowerCase()) > 0) ||
                        (produto.marca.toLowerCase().indexOf(palavra.toLowerCase()) > 0)

                    ) {
                        if((embh && produto.quantidadebh > 0) || (embsb && produto.quantidadebsb > 0)) {
                            if (itens.out.indexOf(produto) == -1) {
                                itens.out.push(produto)
                            }
                        }
                    }
                })
            }, items);
            return items.out;
        }
        else {
            var items = {
                out: []
            };
            angular.forEach(produtos, function (produto, key) {
                var itens = this;
                if((embh && produto.quantidadebh > 0) || (embsb && produto.quantidadebsb > 0)) {
                    if (itens.out.indexOf(produto) == -1) {
                          itens.out.push(produto)
                    }
                }
            }, items);
            return items.out;
        }
    };
});

app.factory("cart",function(){
    return [];
});

app.controller("catalogoCtrl", function ($scope, $http, cart, TillaConfig) {


    $scope.isOpen = false;
    $scope.embh = true;
    $scope.embsb = true;

    $scope.carrinho = cart;

    $scope.addCart = function(produto){
        $scope.carrinho.push(produto);
    }
    $scope.removeCart = function(produto){
        var index = $scope.carrinho.indexOf(produto);
        if(index > -1) {
            $scope.carrinho.splice(index,1);
        }
    }

    $scope.carregando = true;
    $http.get(TillaConfig.apiUrl + "/produto")
        .then(function(resultado){
            $scope.produtos = resultado.data;
        }, function(erro){
            $scope.error = erro.status;
        })
        .then(function(){
            $scope.carregando = false;
        })


});