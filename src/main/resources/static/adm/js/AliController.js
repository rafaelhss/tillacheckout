/**
 * Created by rafa on 27/08/2016.
 */


app.controller("AliController", function ($scope, $http, TillaConfig) {


    $scope.alterar = function(compra, index) {
        $scope.carregando = true;
        console.log(compra)
        compra.recebida = !compra.recebida;
        $http.put(TillaConfig.adminUrl + "/compras/" + compra.id, compra)
            .then(function (response) {
                $scope.compras[index] = response.data;
                $scope.carregando = false;
            }, function (response) {
                console.log('Erro ao buscar compras');
                console.log(response.status);
                $scope.carregando = false;
            });
    }






    var buscarStatusCorreio = function(compras){

        var objetos = '';
        compras.forEach(function(compra){
            objetos += '<objetos>' + compra.rastreio  + '</objetos>'
        });

        var postdata = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"    xmlns:res="http://resource.webservice.correios.com.br/">        <soapenv:Header/>    <soapenv:Body>    <res:buscaEventosLista>    <usuario>ECT</usuario>    <senha>SRO</senha>    <tipo>L</tipo>    <resultado>T</resultado>    <lingua>101</lingua>  ' + objetos + '   </res:buscaEventosLista>    </soapenv:Body>    </soapenv:Envelope>';


        $scope.carregando = true;
        $http.post("https://cors-anywhere.herokuapp.com/http://webservice.correios.com.br:80/service/rastro", postdata
        ).success(function (data, status) {

                console.log(data);
                $scope.carregando = false;
                var x2js = new X2JS();
                var xmlText = data;
                var jsonObj = x2js.xml_str2json(xmlText);

                console.log(jsonObj.Envelope.Body.buscaEventosListaResponse.return.objeto);
                var objetos = [];
                objetos = objetos.concat(jsonObj.Envelope.Body.buscaEventosListaResponse.return.objeto);


                objetos.forEach(function(objeto, index){
                     $scope.compras[index].ultimostatus = objeto.evento["0"].descricao + "(" + objeto.evento["0"].data + ")";

                    if($scope.compras[index].rastreio.toLowerCase() != objeto.numero.toLowerCase()) {
                        $scope.compras[index].ultimostatus += "  INCONSISTENTE[" + $scope.compras[index].rastreio.toLowerCase() + " - " + objeto.numero.toLowerCase();
                    }
                    console.log($scope.compras[index].ultimostatus)
                });

            }).error(function (data, status) {
                $scope.carregando = false;
                console.log("deu ruim")
                console.log(status)
                console.log(data)

            })
    }

    $scope.carregar = function(mostrarRecebidas){
        $scope.carregando = true;
        console.log($scope.carregando)
        $http.get(TillaConfig.adminUrl + "/compras?recebida=" + mostrarRecebidas)
            .then(function (response) {
                $scope.compras = response.data;

                buscarStatusCorreio($scope.compras);


            }, function (response) {
                console.log('Erro ao buscar compras');
                console.log(response.status);
            });
    }


    //buscarStatusCorreio();
    $scope.carregar(false);

    $scope.recarregar = function(){
        $scope.carregar($scope.mostrarRecebidas)
    }

    $scope.criarNova = function(){
        console.log($scope.novacompra);
        $scope.carregando = true;
        $http.post(TillaConfig.adminUrl + "/compras", $scope.novacompra)
        .success(function (data, status) {
            console.log("chegou")
            console.log(data);
            $scope.carregando = false;
        })
        .error(function (data, status) {
            console.log("deu ruim")
                console.log(status)
                console.log(data)
            $scope.carregando = false;
        })
    }


    $scope.novacompra = {};
    $scope.novacompra.data = new Date();
    $scope.novacompra.produto = "nsjda";
    $scope.novacompra.quantidade = 3;
    $scope.novacompra.rastreio = "sdsd"
/*

    var getStatus = function(){
        return "de janeiro";
    }

    $scope.compras = [{
        "data":new Date(2011,10,30),
        "produto":"Y59",
        "quantidade":50,
        "rastreio":"teste"
    },{
        "data":new Date(2011,10,30),
        "produto":"Y59",
        "quantidade":50,
        "rastreio":"teste"
    },{
        "data":new Date(2011,10,30),
        "produto":"Y59",
        "quantidade":50,
        "rastreio":"teste"
    },{
        "data":new Date(2011,10,30),
        "produto":"Y59",
        "quantidade":50,
        "rastreio":"teste"
    }];
*/

});
