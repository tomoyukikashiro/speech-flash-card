(function() {
  'use strict';

  angular
    .module('common.service.personalSettings.dialog', [
      'common.controller.base',
      'common.resource.user'
    ])
    .factory('CommonServicePersonalSettingsDialog', CommonServicePersonalSettingsDialog);

  CommonServicePersonalSettingsDialog.$inject = ['$mdDialog'];

  function CommonServicePersonalSettingsDialog($mdDialog) {

    return {
      show: show
    };

    ///
    function show($event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        parent: angular.element(document.body),
        targetEvent: $event,
        templateUrl: '/templates/personalSettings/dialog.html',
        controller: 'CommonServicePersonalSettingsDialogController',
        controllerAs: 'personalSettingsCtrl'
      });
    }
  }
})();
