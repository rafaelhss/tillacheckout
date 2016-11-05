
app.config(function($routeProvider){
    $routeProvider.when('/carrinho',{
        templateUrl: 'html/carrinho.html',
        controller: 'CarrinhoController'
    })
        .when('/cadastro',{
            templateUrl: 'html/cadastro.html',
            controller: 'CadastroController'
        })
        .when('/editar/:id',{
            templateUrl: 'html/editar.html',
            controller: 'EditarController'
        }).otherwise({
            templateUrl: 'html/home.html',
            controller: 'catalogoCtrl'
    });
});