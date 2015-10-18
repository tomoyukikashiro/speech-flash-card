(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('voiceSelectController', voiceSelectController);

  voiceSelectController.$inject = ['$scope', 'speech'];

  function voiceSelectController($scope, speech) {
    var vm = this;
    vm.voices = speech.getVoices();
    vm.onSelect = onSelect;

    function onSelect($event) {
      if(!vm.selectedVoice){
        return;
      }
      var data = speech.getVoiceParam(vm.selectedVoice);
      var voice = speech.getVoiceData(data.lang, data.name);
      $scope.onSelect({voice: voice});
    }
  }

})();
