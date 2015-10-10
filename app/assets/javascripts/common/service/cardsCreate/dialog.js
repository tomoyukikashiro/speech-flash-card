(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .factory('createCardDialog', createCardDialog);

  createCardDialog.$inject = ['$mdDialog'];

  function createCardDialog($mdDialog) {

    return {
      show: show
    };

    ///
    function show($event, isFirst, bookId) {
      $mdDialog.show({
        clickOutsideToClose: true,
        parent: angular.element(document.body),
        targetEvent: $event,
        templateUrl: '/templates/cards/dialog/create.html',
        controller: 'cardsCreateDialogController',
        controllerAs: 'cardsCreate',
        locals: {
          isFirst: isFirst,
          bookId : bookId
        }
      });
    }
  }
})();
