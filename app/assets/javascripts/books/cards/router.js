(function() {

  'use strict';

  angular.module('cards')
    .config(CardsRouter);

  CardsRouter.$inject = ['$routeProvider'];

  function CardsRouter($routeProvider) {
    $routeProvider
      .when('/books/:bookId/cards/create',
        {
          templateUrl: '/templates/cards/create.html',
          controller: 'CardsCreateController',
          controllerAs: 'cardsCreate'
        })
      .when('/books/:bookId/cards/:cardId',
        {
          templateUrl: '/templates/cards/detail.html',
          controller: 'CardsDetailController',
          controllerAs: 'cardsDetail',
          resolve: {
            card: ['CommonResourceCard', function(CommonResourceCard) {
              return CommonResourceCard.getCard();
            }]
          }
        });
  }

})();
