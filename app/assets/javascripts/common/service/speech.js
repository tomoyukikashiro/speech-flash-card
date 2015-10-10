(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .service('speech', speech);

  function speech() {
    var defOptions = {
      volume: 1,
      rate: 1,
      pitch: 2,
      lang: 'en-US'
    };

    var extendedOptions,
        msg = new SpeechSynthesisUtterance();

    this.init = function(options) {
      extendedOptions = angular.extend({}, defOptions, options);
      msg.volume = extendedOptions.volume;
      msg.rate = extendedOptions.rate;
      msg.pitch = extendedOptions.pitch;
      msg.lang = extendedOptions.lang;
    };

    this.speak = function(text) {
      msg.text = text;
      speechSynthesis.speak(msg);
    };
  }
})();
