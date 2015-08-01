(function() {
  'use strict';

  angular
    .module('common.service.booksCreate.dialog', [])
    .factory('CommonServiceCreateBookDialog', CommonServiceCreateBookDialog);

  CommonServiceCreateBookDialog.$inject = ['$mdDialog'];

  function CommonServiceCreateBookDialog($mdDialog) {

    return {
      show: show
    };

    ///
    function show($event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        parent: angular.element(document.body),
        targetEvent: $event,
        templateUrl: '/templates/books/dialog/create.html',
        controller: 'CommonServiceBooksCreateDialogController',
        controllerAs: 'booksCreate'
      });
    }
  }
})();
