(function() {

  'use strict';

  describe('common/service/cardsCreate/controller.js', function(){
    beforeEach(module('SpeechFlashCard'));
    beforeEach(module('ngMaterial'));

    var controller, spy, spyResourceCard, _commonToast, _$mdDialog, _$httpBackend, _$rootScope, _commonDialog;
    beforeEach(inject(function($controller, $rootScope, $routeParams, $mdDialog, resourceCard, baseController, commonDialog, commonToast, analytics, $httpBackend){
      spy = sinon.stub(analytics, 'sendCurrentPageView');
      spyResourceCard = sinon.spy(resourceCard, 'save');
      _commonDialog = commonDialog;
      _commonToast = commonToast;
      _$mdDialog = $mdDialog;
      _$httpBackend = $httpBackend;
      _$rootScope = $rootScope;
      _$httpBackend.whenGET(/[template.*,\/api\/user]/).respond(200, '');
      controller = $controller('cardsCreateDialogController', {
        $rootScope: $rootScope,
        $routeParams: $routeParams,
        $mdDialog: $mdDialog,
        resourceCard: resourceCard,
        baseController: baseController,
        bookId: 111,
        isFirst: false,
        commonDialog: commonDialog,
        commonToast: commonToast,
        analytics: analytics
      });
    }));
    afterEach(function(){
      spy.restore();
      spyResourceCard.restore();
    });
    it('request page view', function(){
      expect(spy.calledWith('/cards/create/')).to.be.ok();
    });
    describe('#submit', function(){
      describe('success', function(){
        var spyToast, spyMd, spyRootScope, spyRouter;
        beforeEach(function(){
          spyToast = sinon.stub(_commonToast, 'notice');
          spyMd = sinon.stub(_$mdDialog, 'hide');
          spyRootScope = sinon.spy(_$rootScope, '$broadcast');
          spyRouter = sinon.stub(controller.routers.card, 'goDetail');
          controller.text = 'card text';
          controller.note = 'card note';
          _$httpBackend
            .when('POST', '/api/books/111/cards')
            .respond(200, {id: 222, text: 'card text', note: 'card note'});
        });
        afterEach(function(){
          spyToast.restore();
          spyMd.restore();
          spyRootScope.restore();
          spyRouter.restore();
        });
        it('sumit data', function(){
          controller.submit();
          expect(spyResourceCard.calledWith({bookId: 111}, {text: 'card text', note: 'card note'})).to.be.ok();
          _$httpBackend.flush();
          expect(spyMd.called).to.be.ok();
          expect(spyRootScope.called).to.be.ok();
          expect(spyRouter.calledWith(111, 222)).to.be.ok();
          expect(spyToast.calledWith({notice: 'created card'})).to.be.ok();
        });
      });
      describe('error', function(){
        var spyDialog;
        beforeEach(function(){
          spyDialog = sinon.stub(_commonDialog, 'alert');
          controller.text = 'card text';
          controller.note = 'card note';
          _$httpBackend
            .when('POST', '/api/books/111/cards')
            .respond(500, ['tmc']);
        });
        afterEach(function(){
          spyDialog.restore();
        });
        it('sumit data', function(){
          controller.submit();
          expect(spyResourceCard.calledWith({bookId: 111}, {text: 'card text', note: 'card note'})).to.be.ok();
          _$httpBackend.flush();
          expect(spyDialog.calledWith({content: 'Cardはこれ以上つくれません'})).to.be.ok();
        });

      });
    });
  });

})();
