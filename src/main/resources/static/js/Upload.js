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

        }
}]);
