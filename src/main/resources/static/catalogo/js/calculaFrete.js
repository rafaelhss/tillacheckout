function getDataPac(cep) {
    return "nCdEmpresa=&sDsSenha=&nCdServico=41106&sCepOrigem=31160-440&sCepDestino=" + cep + "&nVlPeso=0.3&nCdFormato=1&nVlComprimento=18&nVlAltura=9&nVlLargura=27&nVlDiametro=0&sCdMaoPropria=&nVlValorDeclarado=0&sCdAvisoRecebimento=N";
}

function getDataSedex(cep) {
    return "nCdEmpresa=&sDsSenha=&nCdServico=40010 &sCepOrigem=31160-440&sCepDestino=" + cep + "&nVlPeso=0.3&nCdFormato=1&nVlComprimento=18&nVlAltura=9&nVlLargura=27&nVlDiametro=0&sCdMaoPropria=&nVlValorDeclarado=0&sCdAvisoRecebimento=N";
}

var atualizaTexto = function(postdata, valortag, prazotag, $scope, $http){
    $scope.carregando = true;
    $http.post("https://cors-anywhere.herokuapp.com/http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo", postdata, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        }
    ).success(function (data, status) {
            $scope.carregando = false;
            var x2js = new X2JS();
            var xmlText = data;
            var jsonObj = x2js.xml_str2json(xmlText);

            console.log(jsonObj.cResultado.Servicos.cServico.Valor);

            var prazo = 0 + jsonObj.cResultado.Servicos.cServico.PrazoEntrega;
            var valor =  parseFloat("1.00") + parseFloat(jsonObj.cResultado.Servicos.cServico.Valor.replace(",",".")); //soma $1 pra caixa



            $scope.textoenvio = $scope.textoenvio.replace(valortag, valor.toFixed(2)).replace(prazotag, prazo);

        }).error(function (data, status) {
            $scope.carregando = false;
            $scope.textoenvio = "erro ao calcular frete: " + data.status;

        })
}