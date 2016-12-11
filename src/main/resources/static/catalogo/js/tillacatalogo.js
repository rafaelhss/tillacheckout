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
var geraProdutosFake = function($scope){
    var produtos = [];
    produtos.push(getProdutoTeste('Cola de Cilios','Atelier','70','Cola de cilios Atelier Paris','Cola de cilios transparente da Atelier Paris','A cola da atelier transparente e cola instantaneamente.','cola.jpeg','10','2'))
    produtos.push(getProdutoTeste('Cola de gliter','Atelier','70','Cola de gliter da Atelier paris','Cola para fixação de gliter da Atelier Paris','Essa cola auxilia na fixação de gliter e pigmentos. ','primer.jpeg','10','2'))
    produtos.push(getProdutoTeste('Corretivo 2y','Atelier','110','Corretivo 2y Atelier Paris','Corretivo a prova dagua cor 2y da Atelier.','O corretivo Atelier eh a prova dagua, tem uma cobertura perfeita e não deixa a maquiagem muito pesada.','flwa2y.jpeg','4','5'))
    produtos.push(getProdutoTeste('Base flw70','Atelier','165','Base da Atelier cor flw70','Base da Atelier Paris a prova dagua cor flw70','As bases da atelier paris tem alta cobertura, são à prova dagua e com um efeitto super natural. A cor flw70 eh normalmente usada em pele escura.','flw70.jpeg','6','0'))
    produtos.push(getProdutoTeste('Corretivo 3y','Atelier','110','Corretivo 3y Atelier Paris','Corretivo a prova dagua cor 3y da Atelier.','O corretivo Atelier eh a prova dagua, tem uma cobertura perfeita e não deixa a maquiagem muito pesada.','flwa3y.jpeg','4','5'))
    produtos.push(getProdutoTeste('Base flwy1','Atelier','165','Base da Atelier cor flw1y','Base da Atelier Paris a prova dagua cor flw1y','As bases da atelier paris tem alta cobertura, são à prova dagua e com um efeitto super natural. A cor flw1y eh normalmente usada em pele muito clara.','flw1y.jpeg','9','0'))
    produtos.push(getProdutoTeste('Corretivo flwa4','Atelier','160','Corretivo flwa4 (orange) Atelier Paris','Corretivo a prova dagua cor flwa4 orange  da Atelier.','O corretivo Atelier eh a prova dagua, tem uma cobertura perfeita e não deixa a maquiagem muito pesada. Eh excelente para cobertura de olheiras amarronzadas.','flwa4.jpeg','1','0'))
    produtos.push(getProdutoTeste('Primer','Atelier','120','Primer hidratante oil free Atelier','Primer hidratante da Atelier, usado antes da base, sem óleo.','Esse primer eh indicado para peles de mista a oleosa. Minimiza bastante as linhas de expressão.','primerh.jpeg','6','0'))
    produtos.push(getProdutoTeste('Delineador','Atelier','99','Delineador em gel Atelier Paris','Delineador em gel Atelier Paris, super preto e a prova dagua.','Delineador em gel Atelier Paris, super preto e a prova dagua.','delineador.jpeg','9','0'))
    produtos.push(getProdutoTeste('Primer','Atelier','120','Primer Efeito super matte Atelier','Primer efeito super matte, ideal para ser usado na zona T do rosto.','o primer efeito super matte eh ideal para ser usado na zona T do rosto (Testa, nariz e queixo). Fecha os poros e deixa a pele igual pessego. ','zonat.jpeg','6','6'))

    $scope.produtos = produtos;
};


var getProdutoTeste = function(nome, marca, preco, descCurta, descCompleta, descAdicional,  imgurl, quantidadebh, quantidadebsb){
    var produto = {};
    produto.nome = nome;
    produto.marca = marca;
    produto.descCurta = descCurta;
    produto.descCompleta = descCompleta;
    produto.descAdicional = descAdicional;
    produto.preco = preco;
    produto.imgurl = './img/' + imgurl;
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
                    console.log('palavra:' + palavra);

                    if (
                        (produto.nome.toLowerCase().indexOf(palavra.toLowerCase()) >= 0) ||
                        (produto.descCurta.toLowerCase().indexOf(palavra.toLowerCase()) >= 0) ||
                        (produto.descCompleta.toLowerCase().indexOf(palavra.toLowerCase()) >= 0) ||
                        (produto.descAdicional.toLowerCase().indexOf(palavra.toLowerCase()) >= 0) ||
                        (produto.marca.toLowerCase().indexOf(palavra.toLowerCase()) >= 0)

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

           // geraProdutosFake($scope);

        })
        .then(function(){
            $scope.carregando = false;
        })


});