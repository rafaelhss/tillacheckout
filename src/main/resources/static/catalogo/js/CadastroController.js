var getProdutoTeste = function(nome, marca, preco, descCurta, descCompleta, descAdicional,  imgurl, quantidadebh, quantidadebsb){
    var produto = {};
    produto.nome = nome;
    produto.marca = marca;
    produto.descCurta = descCurta;
    produto.descCompleta = descCompleta;
    produto.descAdicional = descAdicional;
    produto.preco = Number(preco);
    produto.imgurl = "./img/" + imgurl;
    produto.quantidadebh = Number(quantidadebh);
    produto.quantidadebsb = Number(quantidadebsb);

    return produto;
}




app.controller("CadastroController", function ($scope, $http, TillaConfig, $location) {

    console.log($location.search().n)
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


    $scope.novoproduto = produtos[$location.search().n];

    $scope.clearId = function(){
        $scope.novoproduto.id = undefined;
    }

    $scope.cadastrar = function(produto){

        produto.id = undefined;

        produto.imagens = [{url:produto.imgurl, autor: "tillaviana", data: new Date()}];


        $scope.carregando = true;
        $scope.error = undefined;




        $http.post(TillaConfig.apiUrl + "/produto", produto )
            .then(function(result){
                console.log(result.data);
                $scope.novoproduto = result.data;

                // TODO when WS success
                var file = new Blob([ JSON.stringify(produto) ], {
                    type : 'application/json'
                });
                //trick to download store a file having its URL
                var fileURL = URL.createObjectURL(file);
                var a         = document.createElement('a');
                a.href        = fileURL;
                a.target      = '_blank';
                a.download    = produto.nome.replace(/[^\w\s]/gi, '') +'.json';
                document.body.appendChild(a);
                a.click();

            }, function(erro){
                console.log(erro.status);
                console.log(erro)
                $scope.error = erro.status;
            })
            .then(function(){
                $scope.carregando = false;
            })

    }

});
