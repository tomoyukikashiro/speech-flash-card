(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('voiceSelectController', voiceSelectController);

  voiceSelectController.$inject = ['speech'];

  function voiceSelectController(speech) {
    var vm = this;
    vm.voices = speech.getVoices();
    vm.onSelect = onSelect;

    function onSelect($event) {
      if(!vm.selectedVoice){
        return;
      }
      var data = speech.getVoiceParam(vm.selectedVoice);
      var text = speech.getSampleText(data.lang);
      var voice = speech.getVoiceData(data.lang, data.name);
      speech.init({voice: voice});
      speech.speak(text);
    }
  }

})();
