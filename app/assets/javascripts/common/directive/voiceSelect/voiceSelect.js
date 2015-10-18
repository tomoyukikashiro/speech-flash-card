(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .directive('voiceSelect', voiceSelect);

  function voiceSelect() {
    var directive = {
      restrict: 'E',
      controller: 'voiceSelectController',
      controllerAs: 'voiceSelect',
      templateUrl: 'templates/common/directive/voiceSelect.html',
      scope: {
        title: '@',
        onSelect: '&'
      }
    };
    return directive;
  }
})();
