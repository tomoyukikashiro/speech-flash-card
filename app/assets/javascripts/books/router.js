(function() {

  'use strict';

  angular.module('books')
    .config(BooksRouter);

  BooksRouter.$inject = ['$routeProvider'];

  function BooksRouter($routeProvider) {
    $routeProvider
      .when('/books',
          {
            templateUrl: '/templates/books/list.html',
            controller: 'BooksListController',
            controllerAs: 'booksList',
            resolve: {
              books: ['CommonResourceBook', function(CommonResourceBook) {
                return CommonResourceBook.getList();
              }]
            }
          });
  }

})();
