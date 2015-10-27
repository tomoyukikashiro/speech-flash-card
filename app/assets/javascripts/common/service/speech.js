(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .service('speech', speech);

  speech.$inject = ['APP_CONFIG', '$timeout'];

  function speech(APP_CONFIG, $timeout) {
    // https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html
    var defOptions = {
      volume: 1, // 0 -2
      rate: 1,
      pitch: 1 // 0 - 2
    };
    var voiceBlackList = ['alex', 'agnes', 'albert', 'bad news', 'bahh', 'bells', 'boing', 'bruce', 'bubbles', 'cellos', 'deranged',
    'fiona', 'fred', 'good news', 'hysterical', 'junior', 'kathy', 'moira', 'pipe organ', 'princess', 'ralph', 'tessa', 'trinoids',
    'veena', 'vicki', 'victoria', 'whisper', 'zarvox'];

    var extendedOptions,
        msg,
        voices, summlizedVoice,
        matchedVoice; // savedVoices data which match browser voice data.

    // card detailページへ最初に遷移したら呼び出す
    this.init = function(options) {
      extendedOptions = angular.extend({}, defOptions, options);
      if(extendedOptions.voice){
        msg.voice = extendedOptions.voice;
      }
      msg.volume = extendedOptions.volume;
      msg.rate = extendedOptions.rate;
      msg.pitch = extendedOptions.pitch;
    };

    this.speakSampleVoice = function(lang, voice){
      msg.voice = voice;
      msg.text = APP_CONFIG.SAMPLE_VOICE[lang];
      speechSynthesis.speak(msg);
    };

    this.speak = function(text) {
      msg.text = text;
      speechSynthesis.speak(msg);
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

    // savedVoices : 保存された1言語のvoiceデータのリスト
    // ブラウザ毎にvoiceデータがことなるので、複数保存されている可能性あり
    // DB上に保存されたvoiceデータと、現在のブラウザで取得できたvoiceデータを
    // 照合して一番はじめに一致したvoiceを利用する
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

    this.canUseVoice = function() {
      return 'onvoiceschanged' in speechSynthesis;
    };

    this.bindVoicesLoad = function() {
      var me = this;
      msg = new SpeechSynthesisUtterance();
      var onvoiceschanged = function() {
        voices = speechSynthesis.getVoices();
        summlizedVoice = getSummlizeVoice(voices);
      };
      // speechSynthesis is partial support in safari.
      if(me.canUseVoice()){
        window.speechSynthesis.onvoiceschanged = onvoiceschanged;
      }else{
        $timeout(function() {
          onvoiceschanged();
          if(!voices){
            me.bindVoicesLoad();
          }
        }, 500);
      }
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
          return;
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
