(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .service('speech', speech);

  speech.$inject = ['APP_CONFIG'];

  function speech(APP_CONFIG) {
    // https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html
    var defOptions = {
      volume: 1, // 0 -2
      rate: 1,
      pitch: 1 // 0 - 2
    };
    var voiceBlackList = ['alex', 'agnes', 'albert', 'bad news', 'bahh', 'bells', 'boing', 'bruce', 'bubbles', 'cellos', 'deranged'
    ,'fiona', 'fred', 'good news', 'hysterical', 'junior', 'kathy', 'moira', 'pipe organ', 'princess', 'ralph', 'tessa', 'trinoids'
    ,'veena', 'vicki', 'victoria', 'whisper', 'zarvox'];

    var extendedOptions,
        msg = new SpeechSynthesisUtterance(),
        voices, summlizedVoice,
        matchedVoice; // savedVoices data which match browser voice data.

    this.init = function(options) {
      extendedOptions = angular.extend({}, defOptions, options);
      if(extendedOptions.voice){
        msg.voice = extendedOptions.voice;
      }
      msg.volume = extendedOptions.volume;
      msg.rate = extendedOptions.rate;
      msg.pitch = extendedOptions.pitch;
    };

    this.getVoices = function() {
      return summlizedVoice;
    };

    this.getSampleText = function(lang) {
      var _lang = lang.split('-')[0]; // 0: en 1: US
      return APP_CONFIG.SAMPLE_VOICE[_lang.toUpperCase()];
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
      var onvoiceschanged = function() {
        voices = speechSynthesis.getVoices();
        summlizedVoice = getSummlizeVoice(voices);
      }
      // speechSynthesis is partial support in safari.
      if('onvoiceschanged' in speechSynthesis){
        window.speechSynthesis.onvoiceschanged = onvoiceschanged;
      }else{
        onvoiceschanged();
      }
    };

    this.speakSampleVoice = function(lang, voice){
      msg.voice = voice;
      msg.text = APP_CONFIG.SAMPLE_VOICE[lang];
      speechSynthesis.speak(msg);
    }

    this.speak = function(text) {
      msg.text = text;
      speechSynthesis.speak(msg);
    };

    function getSummlizeVoice(voices) {
      var res = {};
      angular.forEach(voices, function(v) {
        if(voiceBlackList.indexOf(v.name.toLowerCase()) !== -1){
          return;
        }
        var lang  = v.lang.split('-')[0];
        var key = APP_CONFIG.LANG[lang.toUpperCase()];
        if(!key){
          // W3Cに定義されていない言語コードが幾つかある
          return
        }
        if(!res[key]){
          res[key] = [];
        }
        res[key].push(v);
      });
      return res;
    }

  }
})();
