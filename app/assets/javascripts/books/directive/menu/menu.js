(function() {
  'use strict';

  angular
    .module('books')
    .directive('fcBookMenu', fcBookMenu);

  function fcBookMenu() {
    var directive = {
      restrict: 'E',
      templateUrl: 'templates/books/menu.html',
      controller: 'BooksMenuController',
      controllerAs: 'booksMenu'
    };
    return directive;
  }
})();
