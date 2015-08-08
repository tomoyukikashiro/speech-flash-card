(function() {
  'use strict';

  angular
    .module('common.service.audioSettings.dialog', [
      'common.controller.base',
      'common.resource.user',
      'common.resource.users.audioSettings',
    ])
    .factory('CommonServiceAuioSettingsDialog', CommonServiceAuioSettingsDialog);

  CommonServiceAuioSettingsDialog.$inject = ['$mdDialog'];

  function CommonServiceAuioSettingsDialog($mdDialog) {

    return {
      show: show
    };

    ///
    function show($event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        parent: angular.element(document.body),
        targetEvent: $event,
        templateUrl: '/templates/audioSettings/dialog.html',
        controller: 'CommonServiceAudioSettingsDialogController',
        controllerAs: 'audioSettingsCtrl'
      });
    }
  }
})();
