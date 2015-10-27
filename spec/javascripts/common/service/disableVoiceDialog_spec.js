(function() {

  'use strict';

  describe('common/service/disableVoiceDialog.js', function(){
    var spy, _disableVoiceDialog;
    beforeEach(module('SpeechFlashCard'));
    beforeEach(module('ngMaterial'));
    beforeEach(inject(function($mdDialog, disableVoiceDialog){
      spy = sinon.stub($mdDialog, 'show');
      _disableVoiceDialog = disableVoiceDialog;
    }));

    describe('#show', function(){
      it('show with options', function(){
        _disableVoiceDialog.show();
        expect(spy.calledWith({
          clickOutsideToClose: false,
          parent: angular.element(document.body),
          templateUrl: '/templates/common/service/disableVoice.html'
        })).to.be.ok();
      });
    });
  });

})();
