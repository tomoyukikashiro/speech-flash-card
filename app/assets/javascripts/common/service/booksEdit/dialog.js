(function() {
  'use strict';

  angular
    .module('common.service.booksEdit.dialog', [])
    .factory('CommonServiceEditBookDialog', CommonServiceEditBookDialog);

  CommonServiceEditBookDialog.$inject = ['$mdDialog'];

  function CommonServiceEditBookDialog($mdDialog) {

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
        controller: 'CommonServiceBooksEditDialogController',
        controllerAs: 'booksEdit',
        locals: {
          book: book
        }
      });
    }
  }
})();
