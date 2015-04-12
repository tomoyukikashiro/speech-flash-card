(function() {

  'use strict';

  angular.module('books')
    .controller('BooksCreateController',
      [
        '$scope',
        'CommonResourceBook',
        'CommonRouterCard',
        BooksCreateController
      ]
    );

  function BooksCreateController($scope, CommonResourceBook, CommonRouterCard) {
    $scope.name = 'books create';
    // public
    $scope.submit = function() {
      CommonResourceBook.resource.save({name: $scope.bookName}, function(response) {
        CommonRouterCard.goList(response.id);
      });
    }
  }

})();
