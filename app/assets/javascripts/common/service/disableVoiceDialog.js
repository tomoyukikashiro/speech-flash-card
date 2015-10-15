(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .factory('disableVoiceDialog', disableVoiceDialog);

  disableVoiceDialog.$inject = ['$mdDialog'];

  function disableVoiceDialog($mdDialog) {

    return {
      show: show
    };

    ///
    function show() {
      $mdDialog.show({
        clickOutsideToClose: false,
        parent: angular.element(document.body),
        templateUrl: '/templates/common/service/disableVoice.html'
      });
    }
  }
})();
