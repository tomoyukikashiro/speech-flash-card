(function() {
  'use strict';

  describe('cards/directive/cardList/', function(){

    var ctrl;
    var _$scope;
    var cardList = {close: angular.noop};
    beforeEach(module('SpeechFlashCard'));
    beforeEach(inject(function($controller, $rootScope, baseController) {
      _$scope = $rootScope.$new();
      ctrl = $controller('cardListController', {
        $scope: _$scope,
        baseController: baseController,
        cardList: cardList
      });
    }));

    describe('#changecard event', function(){
      it('cache id in currentId', function(){
        _$scope.$emit('changecard', '111');
        expect(ctrl.currentId).to.eql('111');
      });
    });

    describe('#changeCard', function(){
      var spy1, spy2;
      beforeEach(function(){
        spy1 = sinon.stub(ctrl.routers.card, 'goDetail');
        spy2 = sinon.stub(cardList, 'close');
      });
      it('mmove card', function(){
        ctrl.changeCard('111');
        expect(spy1.calledWith(null, '111')).to.be.ok();
        expect(spy2.called).to.be.ok();
        spy1.restore();
        spy2.restore();
      });
    });

  });

})();
