
app.config(function($routeProvider){
    $routeProvider.when('/carrinho',{
        templateUrl: 'html/carrinho.html',
        controller: 'CarrinhoController'
    }).otherwise({
        templateUrl: 'html/home.html'
    });
});