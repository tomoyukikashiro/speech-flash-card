(function() {

  'use strict';

  angular.module('books', [], ['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/books', {templateUrl: 'partials/books/list.html', controller: 'BooksListController'})
      .when('/books/create', {templateUrl: 'partials/books/create.html', controller: 'BooksCreateController'});
  }]);

})();
