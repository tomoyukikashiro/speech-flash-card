(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('voiceSelectController', voiceSelectController);

  voiceSelectController.$inject = ['$scope', 'speech', '$timeout'];

  function voiceSelectController($scope, speech, $timeout) {
    var vm = this;
    var selectedVoice;
    vm.voices = '';
    vm.onSelect = onSelect;
    vm.onOpenSelect = onOpenSelect;
    vm.speakSample = speakSample;

    function onOpenSelect() {
      return $timeout(function() {
        vm.voices = speech.getVoices();
      }, 1000);
    }

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
