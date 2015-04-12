(function() {

  'use strict';

  angular.module('books')
    .controller('BooksListController',
      [
        '$scope',
        'CommonResourceBook',
        'CommonRouterBook',
        'CommonRouterCard',
        BooksListController
      ]
    );

  function BooksListController($scope, CommonResourceBook, CommonRouterBook, CommonRouterCard){
    $scope.name = 'books list';
    $scope.bookList = [];

    // init data
    CommonResourceBook.resource.get({}, function(response) {
      $scope.bookList = response.list;
    });

    // public functions
    $scope.routes = {
      Card : CommonRouterCard,
      Book : CommonRouterBook
    };
  }

})();
