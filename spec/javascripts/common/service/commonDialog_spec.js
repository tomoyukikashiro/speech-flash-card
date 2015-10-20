(function() {

  'use strict';

  describe('common/service/commonDialog.js', function(){
    var _commonDialog, _$mdDialog, optionSpy, showSpy;
    beforeEach(module('EnglishFlashCard'));
    beforeEach(module('ngMaterial'));
    beforeEach(inject(function(commonDialog, $mdDialog) {
      _commonDialog = commonDialog;
      _$mdDialog = $mdDialog;
      optionSpy = sinon.stub($mdDialog, 'alert');
      showSpy = sinon.stub($mdDialog, 'show');
    }));
    afterEach(function(){
      optionSpy.restore();
      showSpy.restore();
    });

    describe('#alert', function(){
      describe('with no title and ok option', function(){
        it('use default option', function(){
          _commonDialog.alert({content: 'test content'});
          expect(optionSpy.calledWith({
            title: 'ATTENTION',
            content: 'test content',
            ok: 'Close'
          })).to.be.ok();
          expect(showSpy.called).to.be.ok();
        });
      });
      describe('with title and ok option', function(){
        it('use passed option', function(){
          _commonDialog.alert({title: 'test title', content: 'test content', ok: 'test ok'});
          expect(optionSpy.calledWith({
            title: 'test title',
            content: 'test content',
            ok: 'test ok'
          })).to.be.ok();
          expect(showSpy.called).to.be.ok();
        });
      });
    });
  });

})();
