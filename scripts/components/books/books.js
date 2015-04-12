(function() {

  'use strict';

  angular.module('books',
    [
      'common.resource.book',
      'common.router.book',
      'common.router.card'
    ],
    ['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/books', {templateUrl: 'partials/books/list.html', controller: 'BooksListController'})
        .when('/books/create', {templateUrl: 'partials/books/create.html', controller: 'BooksCreateController'});
    }]
  );

})();
