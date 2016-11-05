app.controller("CarrinhoController", function ($scope, $http, cart) {

    $scope.carrinho = cart;

    $scope.limparCarrinho = function(){
        console.log('yhg')
        cart = [];
        $scope.carrinho = cart;
    }

   console.log("oi")

    var quebraLinha = '%0D%0A';

    var montaTextoBase = function(){

        $scope.valortotal = 0;

        var resumo = {};


        $scope.carrinho.map( function (a) {
            if (a.nome in resumo) {
                resumo[a.nome].quantidade++;
            }
            else {
                resumo[a.nome] = {nome: a.nome, quantidade: 1, preco: a.preco};
            }
        });

        for(var item in resumo ){
            resumo[item].precoTotal = resumo[item].quantidade * resumo[item].preco;
            $scope.valortotal += resumo[item].precoTotal;
        }


        var texto = "Seu 'carrinho' ate agora:" + quebraLinha
        for(var item in resumo ) {
            texto += resumo[item].nome
                + '(x' + resumo[item].quantidade
                + ') $' + resumo[item].precoTotal
                + ' (' + resumo[item].preco+ ' cada)'
            texto += quebraLinha;
        }
        return texto;
    }

    $scope.textoenvio = "";


    $scope.getTexto = function(encoded){
        console.log('gettextp')
        var texto = montaTextoBase();
        texto += $scope.textoenvio;

        texto += quebraLinha;
        texto += "total: " + $scope.valortotal;

        if(encoded){
            return texto;
        } else {
            return decodeURI(texto);
        }
    }



    console.log($scope.resumo)



    $scope.escolheEnvio = function(){
        if(($scope.cep == undefined || $scope.cep.length < 8) && ($scope.envio != 'pedir')){
            $scope.errocep = true
        }
        else{
            $scope.errocep = false;
            $scope.textoenvio = "";
            if($scope.envio == 'pedir'){
                $scope.textoenvio += quebraLinha;
                $scope.textoenvio += "Falta o frete. Me passa seu cep para eu calcular?" + quebraLinha;
            } else if($scope.envio == 'pac'){
                $scope.textoenvio += quebraLinha;
                $scope.textoenvio += "Envio PAC: $[valor] ([prazo] dias)" + quebraLinha;
                atualizaTexto(getDataPac($scope.cep), '[valor]', '[prazo]', $scope, $http);
            } else if($scope.envio == 'sedex'){
                $scope.textoenvio += quebraLinha;
                $scope.textoenvio += "Envio SEDEX: $[valor] ([prazo] dias)" + quebraLinha;
                atualizaTexto(getDataSedex($scope.cep), '[valor]', '[prazo]', $scope, $http);
            }


        }

    }

});
