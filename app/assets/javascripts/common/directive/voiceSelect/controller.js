(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('voiceSelectController', voiceSelectController);

  voiceSelectController.$inject = ['$scope', 'speech'];

  function voiceSelectController($scope, speech) {
    var vm = this;
    var selectedVoice;
    vm.voices = speech.getVoices();
    vm.onSelect = onSelect;
    vm.speakSample = speakSample;

    function speakSample() {
      if(!selectedVoice){
        return;
      }
      speech.init({voice: selectedVoice});
      speech.speak(speech.getSampleText(selectedVoice.lang));
    }

    function onSelect($event) {
      if(!vm.selectedVoice){
        return;
      }
      var data = speech.getVoiceParam(vm.selectedVoice);
      selectedVoice = speech.getVoiceData(data.lang, data.name);
      $scope.onSelect({voice: selectedVoice});
    }
  }

})();
