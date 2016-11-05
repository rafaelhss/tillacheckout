angular.module("tillaApp")
    .service('fileCompress', ['$http', function ($http) {
    this.compress = function(file){


        var quality =  80
        // output file format (jpg || png)
        output_format = 'jpg'
        //This function returns an Image Object
        var target_img = jic.compress(file,quality,output_format);



    }
}]);
