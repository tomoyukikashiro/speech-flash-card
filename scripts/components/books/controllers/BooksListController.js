(function() {

  'use strict';

  angular.module('books')
    .controller('BooksListController', ['$scope', function($scope) {
      $scope.name = 'books list';
    }]);

})();
