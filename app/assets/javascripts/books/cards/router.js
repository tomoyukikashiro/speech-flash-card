(function() {

  'use strict';

  angular.module('cards')
    .config(CardsRouter);

  CardsRouter.$inject = ['$routeProvider'];

  function CardsRouter($routeProvider) {
    $routeProvider
      .when('/books/:bookId/cards',
        {
          templateUrl: '/templates/cards/list.html',
          controller: 'CardsListController',
          controllerAs: 'cardsList',
          resolve: {
            cards: ['CommonResourceCard', function(CommonResourceCard) {
              return CommonResourceCard.getList();
            }]
          }
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
