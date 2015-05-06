(function() {
  'use strict';

  angular
    .module('common.service.cardsCreate.dialog', [])
    .factory('CommonServiceCreateCardDialog', CommonServiceCreateCardDialog);

  CommonServiceCreateCardDialog.$inject = ['$mdDialog'];

  function CommonServiceCreateCardDialog($mdDialog) {

    return {
      show: show
    };

    ///
    function show($event) {
      $mdDialog.show({
        parent: angular.element(document.body),
        targetEvent: $event,
        templateUrl: '/templates/cards/create.html',
        controller: 'CommonServiceCardsCreateDialogController',
        controllerAs: 'cardsCreate'
      });
    }
  }
})();