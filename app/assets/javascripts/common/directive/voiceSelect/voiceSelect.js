(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .directive('voiceSelect', voiceSelect);

  function voiceSelect() {
    var directive = {
      restrict: 'E',
      controller: 'voiceSelectController',
      controllerAs: 'voiceSelect',
      templateUrl: 'templates/common/directive/voiceSelect.html',
      scope: {
        title: '@',
        onSelect: '&',
        selectedVoiceModel: '='
      }
    };
    return directive;
  }
})();
