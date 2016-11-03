var app = angular.module("catalogoApp", ['ngMaterial', 'ngRoute']);

app.config( [
    '$compileProvider',
    function( $compileProvider )
    {
        //config para funcionar whatsapp://
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|whatsapp):/);
    }
]);


var getProdutoTeste = function(nome, preco, descCurta, descCompleta, descAdicional, categoria, imgurl, quantidadebh, quantidadebsb){
    var produto = {};
    produto.nome = nome;
    produto.descCurta = descCurta;
    produto.descCompleta = descCompleta;
    produto.descAdicional = descAdicional;
    produto.preco = preco;
    produto.categoria = categoria;
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
                    if (produto.descCurta.toLowerCase().indexOf(palavra.toLowerCase()) > 0) {
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

app.controller("catalogoCtrl", function ($scope, $http, cart) {


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


    $scope.getProdutos = function(){
        var produtos = [];
        produtos.push(getProdutoTeste('Cilios Y59', '25', 'Cilios modelo Y59 com 10 pares', 'O Y59 vem com 10 pares e tem base de linha', "O y59 tem base d elinha que facilita a coloca��o. ele d� um efeito natural sem ser mioto cheio.", "CILIOS","http://d236bkdxj385sg.cloudfront.net/wp-content/uploads/2012/09/EYELASHES1.jpg",50,40))
        produtos.push(getProdutoTeste('Cilios K16', '25', 'Cilios modelo K16 com 10 pares', 'O K16 vem com 10 pares e tem base de silicone', "O K16 tem base de silicone que facilita a coloca��o. ele d� um efeito super marcante pois � super volumoso. Eh nosso campe�o de vendas.", "CILIOS","http://d236bkdxj385sg.cloudfront.net/wp-content/uploads/2012/09/EYELASHES1.jpg",30,0))
        produtos.push(getProdutoTeste('Paleta Atelier modelo T03', '175', 'Paleta de sombras atelier modelo T03', 'Essa paleta vem com 5 sombras com cores variadas', "As paletas da atelier s�o as melhores do mercado. As cores da T03 s�o mais para make de festa.", "PALETAS","http://d236bkdxj385sg.cloudfront.net/wp-content/uploads/2012/09/EYELASHES1.jpg",0,2))
        produtos.push(getProdutoTeste('Paletas Atelier', '175', 'Paletas de sombras atelier, modelos T03, T02, T22, T', 'Essa paleta vem com 5 sombras com cores variadas', "As paletas da atelier s�o as melhores do mercado. As cores da T03 s�o mais para make de festa.", "PALETAS","http://d236bkdxj385sg.cloudfront.net/wp-content/uploads/2012/09/EYELASHES1.jpg",2,3))
        return produtos;
    }

    $scope.produtos = $scope.getProdutos();
});