(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .factory('auioSettingsDialog', auioSettingsDialog);

  auioSettingsDialog.$inject = ['$mdDialog'];

  function auioSettingsDialog($mdDialog) {

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
        controller: 'audioSettingsDialogController',
        controllerAs: 'audioSettingsCtrl'
      });
    }
  }
})();
