(function() {

  'use strict';

  angular.module('cards')
    .config(CardsRouter);

  CardsRouter.$inject = ['$routeProvider'];

  function CardsRouter($routeProvider) {
    $routeProvider
      .when('/books/:bookId/cards', {templateUrl: '/templates/cards/list.html', controller: 'CardsListController', controllerAs: 'cardsList'})
      .when('/books/:bookId/cards/create', {templateUrl: '/templates/cards/create.html', controller: 'CardsCreateController', controllerAs: 'cardsCreate'})
      .when('/books/:bookId/cards/:cardId', {templateUrl: '/templates/cards/detail.html', controller: 'CardsDetailController', controllerAs: 'cardsDetail'});
  }

})();
