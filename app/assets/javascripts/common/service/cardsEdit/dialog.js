(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .factory('editCardDialog', editCardDialog);

  editCardDialog.$inject = ['$mdDialog'];

  function editCardDialog($mdDialog) {

    return {
      show: show
    };

    ///
    function show($event, card) {
      $mdDialog.show({
        clickOutsideToClose: true,
        parent: angular.element(document.body),
        targetEvent: $event,
        templateUrl: '/templates/cards/dialog/edit.html',
        controller: 'cardsEditDialogController',
        controllerAs: 'cardsEdit',
        locals: {
          card: card
        }
      });
    }
  }
})();
