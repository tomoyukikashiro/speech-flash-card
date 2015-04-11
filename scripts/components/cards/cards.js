(function() {

  'use strict';

  angular.module('cards', [], ['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/books/:booksId/cards', {templateUrl: 'partials/cards/list.html', controller: 'CardsListController'})
      .when('/books/:booksId/cards/create', {templateUrl: 'partials/cards/create.html', controller: 'CardsCreateController'})
      .when('/books/:booksId/cards/:cardId', {templateUrl: 'partials/cards/detail.html', controller: 'CardsDetailController'});
  }]);

})();
