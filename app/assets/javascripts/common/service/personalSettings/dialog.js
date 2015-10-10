(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .factory('personalSettingsDialog', personalSettingsDialog);

  personalSettingsDialog.$inject = ['$mdDialog'];

  function personalSettingsDialog($mdDialog) {

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
        controller: 'personalSettingsDialogController',
        controllerAs: 'personalSettingsCtrl'
      });
    }
  }
})();
