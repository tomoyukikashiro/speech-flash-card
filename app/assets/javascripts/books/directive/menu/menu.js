(function() {
  'use strict';

  angular
    .module('books')
    .directive('fcBookMenu', fcBookMenu);

  function fcBookMenu() {
    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'templates/books/menu.html',
      controller: 'BooksMenuController',
      controllerAs: 'booksMenu'
    };
    return directive;

    function link(scope, element, attrs) {
    }
  }
})();
