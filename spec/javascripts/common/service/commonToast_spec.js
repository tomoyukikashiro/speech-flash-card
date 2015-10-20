(function() {

  'use strict';

  describe('common/service/commonToast.js', function(){
    var _commonToast, _$mdToast, spy;
    beforeEach(module('EnglishFlashCard'));
    beforeEach(module('ngMaterial'));
    beforeEach(inject(function(commonToast, $mdToast){
      _commonToast = commonToast;
      _$mdToast = $mdToast;

      spy = sinon.stub(_$mdToast, 'show');
    }));
    afterEach(function(){
      spy.restore();
    });

    describe('#notice', function(){
      it('show toast by given notice params', function(){
        _commonToast.notice({notice: 'test notice'});
        expect(spy.called).to.ok();
      });
    });
  });

})();
