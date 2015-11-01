(function() {

  'use strict';
  describe('common/service/speech.js', function(){
    var _speech, spy, config, _$rootScope;
    beforeEach(module('SpeechFlashCard'));
    beforeEach(inject(function($rootScope, speech, APP_CONFIG, $httpBackend){
      _$rootScope = $rootScope;
      _speech = speech;
      config = APP_CONFIG;
      $httpBackend.whenGET(/template.*/).respond(200, '');
      if(!window.SpeechSynthesisUtterance) {
        window.SpeechSynthesisUtterance = function() {};
      }
      if(!window.speechSynthesis){
        window.speechSynthesis = {speak: function() {}, getVoices: function() {}};
      }
    }));
    afterEach(function(){
      if(spy){
        spy.restore();
      }
    });

    describe('#bindVoicesLoad', function(){
      describe('onvoiceschanged event exist in speechSynthesis', function(){
        var stub1, stub2;
        beforeEach(function(){
          stub1 = sinon.stub(_speech, 'canUseVoice').returns(true);
          stub2 = sinon.stub(window.speechSynthesis, 'getVoices').returns(getDummyVoice());
        });
        afterEach(function(){
          stub1.restore();
          stub2.restore();
        });
        it('onvoiceschanged method is called', function(){
          _speech.bindVoicesLoad();
          expect(window.speechSynthesis.onvoiceschanged).to.be.a('function');
          window.speechSynthesis.onvoiceschanged();
          expect(_speech.getVoices()).to.eql({'German':[{'default':true,'lang':'de-DE','localService':false,'name':'Google Deutsch','voiceURI':'Google Deutsch'}]});
        });
      });
      // TODO $timeoutを実行することができない
      xdescribe('onvoiceschanged event dose not exist in speechSynthesis', function(){
        var stub1, stub2, clock;
        beforeEach(function(){
          stub1 = sinon.stub(_speech, 'canUseVoice').returns(false);
          stub2 = sinon.stub(window.speechSynthesis, 'getVoices').returns(getDummyVoice());
          clock = sinon.useFakeTimers();
        });
        afterEach(function(){
          stub1.restore();
          stub2.restore();
          clock.restore();
        });
        it('onvoiceschanged method is called', function(){
          _speech.bindVoicesLoad();
          _$rootScope.$digest();
        });
      });
    });
    describe('#getVoiceData', function(){
      beforeEach(function(){
        // return dummy voice data
        var stub1, stub2;
        beforeEach(function(){
          stub1 = sinon.stub(_speech, 'canUseVoice').returns(true);
          stub2 = sinon.stub(window.speechSynthesis, 'getVoices').returns(getDummyVoice());
          _speech.bindVoicesLoad();
          expect(window.speechSynthesis.onvoiceschanged).to.be.a('function');
          window.speechSynthesis.onvoiceschanged();
        });
        afterEach(function(){
          stub1.restore();
          stub2.restore();
        });
      });
      xit('return voice data', function(){
        // TODO beforeでvoicesにデータが可能されるが、_speech.getVoiceDataで呼ぶときには、voicesがundefinedになってしまう
        expect(_speech.getVoiceData('de-DE', 'Google Deutsch')).to.eql({'default':true,'lang':'de-DE','localService':false,'name':'Google Deutsch','voiceURI':'Google Deutsch'});
      });
    });
    describe('#getSelectedVoiceData', function(){
      // TODO getVoiceData が動いてから
    });
    describe('#getVoiceKey', function(){
      it('retun key', function(){
        expect(_speech.getVoiceKey('testlang', 'test name')).to.equal('testlang_test name');
      });
    });
    describe('#getVoiceParam', function(){
      describe('if matchedVoice dose not exist', function(){
        it('return lang and name param only', function(){
          expect(_speech.getVoiceParam(_speech.getVoiceKey('lang', 'name'))).to.eql({lang: 'lang', name: 'name'});
        });
      });
      describe('if matchedVoice exist', function(){
        // TODO
      });
    });
    describe('#getSampleText', function(){
      it('return sample test', function(){
        angular.forEach(config.SAMPLE_VOICE, function(v, k) {
          expect(_speech.getSampleText(k.toLowerCase())).to.equal(v);
        });
      });
    });
    describe('#getVoices', function(){
      // #bindVoicesLoad でテストずみ
    });
    describe('#speak', function(){
      beforeEach(function(){
        spy = sinon.stub(speechSynthesis, 'speak');
      });
      it('call speechSynthesis with text', function(){
        _speech.speak('test');
        expect(spy.called).to.be.ok();
        expect(spy.args[0][0].text).to.equal('test');
      });
    });
    describe('#speakSampleVoice', function(){
      beforeEach(function(){
        spy = sinon.stub(speechSynthesis, 'speak');
      });
      it('call speechSynthesis with text', function(){
        var lang = Object.keys(config.SAMPLE_VOICE)[0];
        _speech.speakSampleVoice(lang, angular.noop);
        expect(spy.called).to.be.ok();
        expect(spy.args[0][0].text).to.equal(config.SAMPLE_VOICE[lang]);
        expect(spy.args[0][0].voice).to.eql(angular.noop);
      });

    });

  });

  function getDummyVoice() {
    return [
      {
        default: true,
        lang: 'de-DE',
        localService: false,
        name: 'Google Deutsch',
        voiceURI: 'Google Deutsch'
      }
    ];
  }

})();
