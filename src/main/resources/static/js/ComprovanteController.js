/**
 * Created by rafa on 27/08/2016.
 */
(function () {
    "use strict";


    angular.module("tillaApp").controller('ComprovanteController',
        ['$scope', 'fileUpload', 'ngDialog','$location','TillaConfig',

    function($scope, fileUpload, ngDialog,$location, TillaConfig){
        $scope.whatsapp = localStorage.getItem("whatsapp");
        $scope.facebook = localStorage.getItem("facebook");
        $scope.produtos = localStorage.getItem("produtos");
        $scope.endereco = JSON.parse(localStorage.getItem("endereco"));





        console.log("myfile");
            console.log($scope.myFile);
            $scope.uploadFile = function(){
                var file = $scope.myFile;

                var fd = new FormData();
                fd.append('file', file);
                fd.append('whatsapp', localStorage.getItem("whatsapp"));
                fd.append('facebook', localStorage.getItem("facebook"));
                fd.append('produtos', localStorage.getItem("produtos"));
                fd.append('endereco', localStorage.getItem("endereco"));

                console.log('file is ' );
                console.dir(file);
                var uploadUrl = TillaConfig.apiUrl +'/'
                    + localStorage.getItem("user")
                    + '/vendas';
                console.log("uploadUrl:" + uploadUrl);
                fileUpload.uploadFileToUrl(fd, uploadUrl, $scope);
                $scope.myFile = undefined;
            };

            $scope.fileSet = function(){
                return $scope.myFile != undefined;
            }


        }]);
})();

