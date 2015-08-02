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
              currentUser: ['CommonResourceUser', 'CommonResolveRedirection', 'CommonRouterBook',
                function(CommonResourceUser, CommonResolveRedirection, CommonRouterBook) {
                  return CommonResolveRedirection.redirect(CommonResourceUser.checkCurrent(), null, '/');
                }
              ],
              books: ['CommonResourceBook', function(CommonResourceBook) {
                return CommonResourceBook.getList();
              }]
            }
          });
  }

})();
