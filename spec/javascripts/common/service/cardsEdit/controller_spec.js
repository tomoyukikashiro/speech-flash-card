(function() {

  'use strict';

  describe('common/service/cardsEdit/controller.js', function(){
    beforeEach(module('EnglishFlashCard'));
    beforeEach(module('ngMaterial'));
    var $httpBackend, $controller, $rootScope, $routeParams, $mdDialog, resourceCard, baseController, commonToast, analytics;
    beforeEach(inject(function(_$httpBackend_, _$controller_, _$rootScope_, _$routeParams_, _$mdDialog_, _resourceCard_, _baseController_, _commonToast_, _analytics_){
      $httpBackend = _$httpBackend_;
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $routeParams = _$routeParams_;
      $mdDialog = _$mdDialog_;
      resourceCard = _resourceCard_;
      baseController = _baseController_;
      commonToast = _commonToast_;
      analytics = _analytics_;
      $httpBackend.whenGET(/[template.*|/api/users]/).respond(200, '');
      $routeParams.bookId = '111';
      $routeParams.cardId = '111';
    }));

    describe('#activate', function(){
      var spy;
      beforeEach(function(){
        spy = sinon.stub(analytics, 'sendCurrentPageView');
        $controller('cardsEditDialogController', {
          $httpBackend : $httpBackend,
          $controller : $controller,
          $rootScope : $rootScope,
          $routeParams : $routeParams,
          $mdDialog : $mdDialog,
          resourceCard : resourceCard,
          baseController : baseController,
          commonToast : commonToast,
          analytics : analytics,
          card : {text: '', note: ''}
        });
      });
      afterEach(function(){
        spy.restore();
      });
      it('request analytics', function(){
        expect(spy.calledWith('/cards/edit/')).to.be.ok();
      });
    });
    describe('#remove', function(){
      var spyDialog, spyResourceRemove;
      beforeEach(function(){
        $httpBackend
          .when('DELETE', '/api/books/111/cards/111')
          .respond();
        spyDialog = sinon.stub($mdDialog, 'hide');
        spyResourceRemove = sinon.spy(resourceCard, 'remove');
      });
      afterEach(function(){
        spyDialog.restore();
        spyResourceRemove.restore();
      });
      describe('has next', function(){
        var ctrl, spyResource, spyRouterCard;
        beforeEach(function(){
          spyResource = sinon.stub(resourceCard, 'getIterator').returns({hasPrev: function() {return false;},hasNext: function() {return true;}, getNext: function() {return {id: '222'};}});
          ctrl = $controller('cardsEditDialogController', {
            $httpBackend : $httpBackend,
            $controller : $controller,
            $rootScope : $rootScope,
            $routeParams : $routeParams,
            $mdDialog : $mdDialog,
            resourceCard : resourceCard,
            baseController : baseController,
            commonToast : commonToast,
            analytics : analytics,
            card : {id: '111', text: '', note: ''}
          });
          spyRouterCard = sinon.stub(ctrl.routers.card, 'goDetail');
        });
        afterEach(function(){
          spyResource.restore();
          spyRouterCard.restore();
        });
        it('request delete and next card', function(){
          ctrl.remove();
          $httpBackend.flush();
          expect(spyResourceRemove.calledWith({bookId: '111', cardId: '111'})).to.be.ok();
          expect(spyRouterCard.calledWith(null, '222')).to.be.ok();
          expect(spyDialog.called).to.be.ok();
        });
      });
      describe('has prev', function(){
        var ctrl, spyResource, spyRouterCard;
        beforeEach(function(){
          spyResource = sinon.stub(resourceCard, 'getIterator').returns({hasNext: function() {return false;}, hasPrev: function() {return true;}, getPrev: function() {return {id: '222'};}});
          ctrl = $controller('cardsEditDialogController', {
            $httpBackend : $httpBackend,
            $controller : $controller,
            $rootScope : $rootScope,
            $routeParams : $routeParams,
            $mdDialog : $mdDialog,
            resourceCard : resourceCard,
            baseController : baseController,
            commonToast : commonToast,
            analytics : analytics,
            card : {id: '111', text: '', note: ''}
          });
          spyRouterCard = sinon.stub(ctrl.routers.card, 'goDetail');
        });
        afterEach(function(){
          spyResource.restore();
          spyRouterCard.restore();
        });
        it('request delete and prev card', function(){
          ctrl.remove();
          $httpBackend.flush();
          expect(spyResourceRemove.calledWith({bookId: '111', cardId: '111'})).to.be.ok();
          expect(spyRouterCard.calledWith(null, '222')).to.be.ok();
          expect(spyDialog.called).to.be.ok();
        });
      });
      describe('no cards', function(){
        var ctrl, spyResource, spyRouterBook;
        beforeEach(function(){
          spyResource = sinon.stub(resourceCard, 'getIterator').returns({hasNext: function() {return false;}, hasPrev: function() {return false;}});
          ctrl = $controller('cardsEditDialogController', {
            $httpBackend : $httpBackend,
            $controller : $controller,
            $rootScope : $rootScope,
            $routeParams : $routeParams,
            $mdDialog : $mdDialog,
            resourceCard : resourceCard,
            baseController : baseController,
            commonToast : commonToast,
            analytics : analytics,
            card : {id: '111', text: '', note: ''}
          });
          spyRouterBook = sinon.stub(ctrl.routers.book, 'goList');
        });
        afterEach(function(){
          spyResource.restore();
          spyRouterBook.restore();
        });
        it('request delete and go book list', function(){
          ctrl.remove();
          $httpBackend.flush();
          expect(spyResourceRemove.calledWith({bookId: '111', cardId: '111'})).to.be.ok();
          expect(spyRouterBook.called).to.be.ok();
          expect(spyDialog.called).to.be.ok();
        });
      });
    });
    describe('#submit', function(){
      var ctrl, spyResource, spyDialog;
      beforeEach(function(){
        spyResource = sinon.spy(resourceCard, 'update');
        spyDialog = sinon.stub($mdDialog, 'hide');
        ctrl = $controller('cardsEditDialogController', {
          $httpBackend : $httpBackend,
          $controller : $controller,
          $rootScope : $rootScope,
          $routeParams : $routeParams,
          $mdDialog : $mdDialog,
          resourceCard : resourceCard,
          baseController : baseController,
          commonToast : commonToast,
          analytics : analytics,
          card : {id: '111', text: '', note: ''}
        });
        $httpBackend
          .when('PUT', '/api/books/111/cards/111')
          .respond();
      });
      afterEach(function(){
        spyResource.restore();
        spyDialog.restore();
      });
      it('request put', function(){
        ctrl.card = {text: 'text 2', note: 'note 2'};
        ctrl.submit();
        $httpBackend.flush();
        expect(spyDialog.called).to.be.ok();
        expect(spyResource.calledWith({bookId: '111', cardId: '111'}, {text: 'text 2', note: 'note 2'})).to.be.ok();
      });
    });
  });

})();
