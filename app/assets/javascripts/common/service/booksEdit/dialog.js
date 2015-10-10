(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .factory('editBookDialog', editBookDialog);

  editBookDialog.$inject = ['$mdDialog'];

  function editBookDialog($mdDialog) {

    return {
      show: show
    };

    ///
    function show($event, book) {
      $mdDialog.show({
        clickOutsideToClose: true,
        parent: angular.element(document.body),
        targetEvent: $event,
        templateUrl: '/templates/books/dialog/edit.html',
        controller: 'booksEditDialogController',
        controllerAs: 'booksEdit',
        locals: {
          book: book
        }
      });
    }
  }
})();
