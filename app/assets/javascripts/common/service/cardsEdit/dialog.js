(function() {
  'use strict';

  angular
    .module('common.service.cardsEdit.dialog', [])
    .factory('CommonServiceEditCardDialog', CommonServiceEditCardDialog);

  CommonServiceEditCardDialog.$inject = ['$mdDialog'];

  function CommonServiceEditCardDialog($mdDialog) {

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
        controller: 'CommonServiceCardsEditDialogController',
        controllerAs: 'cardsEdit',
        locals: {
          card: card
        }
      });
    }
  }
})();
