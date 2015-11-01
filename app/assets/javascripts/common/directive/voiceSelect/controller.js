(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .controller('voiceSelectController', voiceSelectController);

  voiceSelectController.$inject = ['$scope', 'speech', '$timeout'];

  function voiceSelectController($scope, speech, $timeout) {
    var vm = this;
    vm.voices = speech.getVoices();
    vm.speakSample = speakSample;
    vm.onOpenSelect = onOpenSelect;

    function onOpenSelect() {
      return $timeout(function() {
        vm.voices = speech.getVoices();
      }, 1000);
    }

    function speakSample() {
      if(!$scope.selectedVoiceModel){
        return;
      }
      var data = speech.getVoiceParam($scope.selectedVoiceModel);
      var selectedVoice = speech.getVoiceData(data.lang, data.name);
      speech.init({voice: selectedVoice});
      speech.speak(speech.getSampleText(selectedVoice.lang));
    }
  }

})();
