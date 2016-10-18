angular.module("tillaApp").directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    console.log(element[0].files[0])
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
/*
angular.module("tillaApp").directive('imgModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.imgModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].src);
                });
            });
        }
    };
}]);
*/
angular.module("tillaApp").service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(fd, uploadUrl, $scope){

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
}]);
