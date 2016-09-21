/**
 * Created by rafa on 27/08/2016.


 */


function srcToFile2(src, fileName, mimeType){

    var byteString = atob(src.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ia], {
        type: mimeType
    });
    var file = new File([blob], mimeType);


    return file;


}

function srcToFile(src, fileName, mimeType){
    //TODO: so se for imagem.. cuidado com pdf
    return (fetch(src)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], fileName, {type:mimeType});})
    );
}

function carregaParametrosDoLocalStorage($scope) {
    $scope.whatsapp = localStorage.getItem("whatsapp");
    $scope.facebook = localStorage.getItem("facebook");
    $scope.produtos = localStorage.getItem("produtos");
    $scope.endereco = JSON.parse(localStorage.getItem("endereco"));
    $scope.email = localStorage.getItem("email");
    $scope.nome = localStorage.getItem("nome");
    $scope.contato = localStorage.getItem("contato");
}

function bindFiletoImage($scope){
    document.getElementById("upload").onchange = function () {
        var reader = new FileReader();

        reader.onload = function (e) {
            // get loaded data and render thumbnail.
            document.getElementById("imagec").src = e.target.result;

            //Images Objects
            var source_img = document.getElementById("imagec"),
                target_img = document.getElementById("imagec");

            var quality =  5;
            var output_format = 'jpg';
            try {
                target_img.src = jic.compress(source_img, quality, output_format).src;
                //this.files[0].target.result = target_img.src;
            }
            catch(err) {
                $scope.erro = "erro ao comprimir: " + err;
            }
        };

        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
    };
}

function upload(file, $scope, $http, TillaConfig){
    var fd = new FormData();
    fd.append('file', file);
    fd.append('whatsapp', localStorage.getItem("whatsapp"));
    fd.append('facebook', localStorage.getItem("facebook"));
    fd.append('produtos', localStorage.getItem("produtos"));
    fd.append('endereco', localStorage.getItem("endereco"));
    fd.append('email', localStorage.getItem("email"));
    fd.append('nome', localStorage.getItem("nome"));

    var uploadUrl = TillaConfig.apiUrl +'/'
        + localStorage.getItem("contato")
        + '/vendas';
    console.log("uploadUrl:" + uploadUrl);
    //fileUpload.uploadFileToUrl(fd, uploadUrl, $scope);
    $scope.uploading = true;
    $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
    })
        .then(function(response){
            console.log("foi");
            $scope.vendaConcluida = response.data;
            $scope.uploading = false;
        },function(response){
            $scope.uploading = false;
            console.log("NAO foi:");
            console.log(response);
            $scope.erro = response.status + ' ' + response.statusText + "(Erro no servidor ou na conexao)";
        });

    $scope.myFile = undefined;
}

(function () {
    "use strict";


    angular.module("tillaApp").controller('ComprovanteController',
        ['$scope','$http', 'fileUpload', 'fileCompress', 'ngDialog', '$location','TillaConfig',

    function($scope, $http, fileUpload, fileCompress, ngDialog,$location,  TillaConfig){
        carregaParametrosDoLocalStorage($scope);

        bindFiletoImage($scope);

        $scope.uploadFile = function(){
            console.log("myfile:");
            console.log($scope.myFile);
            if($scope.myFile.type == 'image/jpeg' || $scope.myFile.type == 'image/png' ) {
                var target_img = document.getElementById("imagec");
                /*srcToFile(target_img.src, 'logo.png', 'image/png')
                    .then(function(file){
                        upload(file, $scope, $http, TillaConfig);
                    })*/
                upload(srcToFile2(target_img.src, 'logo.png', 'image/png'), $scope, $http, TillaConfig);

            } else {
                $scope.erro = "Escolha uma imagem como comprovante (voce escolheu pdf?). Dica: tire print ou foto do comprovante e envie."
                $scope.myFile = undefined;
            }




        };

            $scope.fileSet = function(){
                return $scope.myFile != undefined;
            }


        }]);
})();

