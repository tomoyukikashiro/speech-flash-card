(function() {

  'use strict';

  describe('common/controller/baseController.js', function(){

    var ctrl, _$rootScope;
    beforeEach(module('EnglishFlashCard'));
    beforeEach(inject(function($rootScope, baseController) {
      _$rootScope = $rootScope;
      ctrl = baseController;
    }));

    it('#pageChange', function(){
      var spy = sinon.stub(_$rootScope, '$emit');
      ctrl.pageChange('test page');
      expect(spy.calledWith('pagechange', {name: 'test page'})).to.be.ok();
      spy.restore();
    });

  });

})();
