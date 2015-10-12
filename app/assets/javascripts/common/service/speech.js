(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .service('speech', speech);

  speech.$inject = ['APP_CONFIG'];

  function speech(APP_CONFIG) {
    var defOptions = {
      volume: 1,
      rate: 1,
      pitch: 2,
      lang: 'en-US'
    };

    var extendedOptions,
        msg = new SpeechSynthesisUtterance(),
        voices, summlizedVoice,
        matchedVoice; // savedVoices data which match browser voice data.

    this.init = function(options) {
      extendedOptions = angular.extend({}, defOptions, options);
      msg.volume = extendedOptions.volume;
      msg.rate = extendedOptions.rate;
      msg.pitch = extendedOptions.pitch;
      msg.lang = extendedOptions.lang;
    };

    this.getVoices = function() {
      return summlizedVoice;
    };

    // target : voice.lang + '_' + voice.name
    this.getVoiceParam = function(target) {
      var lang = target.split('_')[0];
      var name = target.split('_')[1];
      var param = {
        lang: lang,
        name: name
      };
      if(matchedVoice){
        param.id = matchedVoice.id;
      }
      return param;
    };

    this.getVoiceKey = function(lang, name) {
      return lang + '_' + name;
    };

    // @param savedVoices : selected voice data list
    // return selected voice data
    // if there is not voice which you selected
    // return null.
    this.getSelectedVoiceData = function(savedVoices) {
      var me = this;
      var res;
      angular.forEach(savedVoices, function(v) {
        res = me.getVoiceData(v.lang, v.name);
        if(res){
          matchedVoice = v;
          return false;
        }
      });
      return res || null;
    };

    this.getVoiceData = function(lang, name) {
      var res;
      angular.forEach(voices, function(v) {
        if(v.name === name && v.lang === lang){
          res = v;
          return;
        }
      });
      return res;
    };

    this.bindVoicesLoad = function() {
      window.speechSynthesis.onvoiceschanged = function() {
        voices = speechSynthesis.getVoices();
        summlizedVoice = summlizeVoice(voices);
      }
    };

    this.speak = function(text) {
      msg.text = text;
      speechSynthesis.speak(msg);
    };

    function summlizeVoice(voices) {
      var res = {};
      angular.forEach(voices, function(v) {
        var lang   = v.lang.split('-')[0];
        var key = APP_CONFIG.LANG[lang.toUpperCase()];
        if(!res[key]){
          res[key] = [];
        }
        res[key].push(v);
      });
      return res;
    }

  }
})();
