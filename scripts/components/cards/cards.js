(function() {

  'use strict';

  angular.module('cards',
    [
      'common.resource.card',
      'common.router.book',
      'common.router.card',
      'common.service.speech'
    ],
    ['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/books/:bookId/cards', {templateUrl: 'partials/cards/list.html', controller: 'CardsListController'})
      .when('/books/:bookId/cards/create', {templateUrl: 'partials/cards/create.html', controller: 'CardsCreateController'})
      .when('/books/:bookId/cards/:cardId', {templateUrl: 'partials/cards/detail.html', controller: 'CardsDetailController'});
  }]);

})();
