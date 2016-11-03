var app = angular.module("catalogoApp", ['ngMaterial']);

app.config( [
    '$compileProvider',
    function( $compileProvider )
    {
        //config para funcionar whatsapp://
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|whatsapp):/);
    }
]);


var getProdutoTeste = function(nome, preco, descCurta, descCompleta, descAdicional, categoria, imgurl){
    var produto = {};
    produto.nome = nome;
    produto.descCurta = descCurta;
    produto.descCompleta = descCompleta;
    produto.descAdicional = descAdicional;
    produto.preco = preco;
    produto.categoria = categoria;
    produto.imgurl = imgurl;

    return produto;
}


app.controller("catalogoCtrl", function ($scope, $http) {

    $scope.getProdutos = function(){
        var produtos = [];
        produtos.push(getProdutoTeste('Cilios Y59', '$25', 'Cilios modelo Y59 com 10 pares', 'O Y59 vem com 10 pares e tem base de linha', "O y59 tem base d elinha que facilita a colocação. ele dá um efeito natural sem ser mioto cheio.", "CILIOS","http://d236bkdxj385sg.cloudfront.net/wp-content/uploads/2012/09/EYELASHES1.jpg"))
        produtos.push(getProdutoTeste('Cilios K16', '$25', 'Cilios modelo K16 com 10 pares', 'O K16 vem com 10 pares e tem base de silicone', "O K16 tem base de silicone que facilita a colocação. ele dá um efeito super marcante pois é super volumoso. Eh nosso campeão de vendas.", "CILIOS","http://d236bkdxj385sg.cloudfront.net/wp-content/uploads/2012/09/EYELASHES1.jpg"))
        produtos.push(getProdutoTeste('Paleta Atelier modelo T03', '$175', 'Paleta de sombras atelier modelo T03', 'Essa paleta vem com 5 sombras com cores variadas', "As paletas da atelier são as melhores do mercado. As cores da T03 são mais para make de festa.", "PALETAS","http://d236bkdxj385sg.cloudfront.net/wp-content/uploads/2012/09/EYELASHES1.jpg"))
        produtos.push(getProdutoTeste('Paletas Atelier', '$175', 'Paletas de sombras atelier, modelos T03, T02, T22, T', 'Essa paleta vem com 5 sombras com cores variadas', "As paletas da atelier são as melhores do mercado. As cores da T03 são mais para make de festa.", "PALETAS","http://d236bkdxj385sg.cloudfront.net/wp-content/uploads/2012/09/EYELASHES1.jpg"))
        return produtos;
    }

    $scope.produtos = $scope.getProdutos();
});