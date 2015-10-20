(function() {

  'use strict';

  describe('common/service/booksEdit/controller.js', function(){

    var $controller, analytics, $mdDialog, resourceBook, baseController, speech, commonToast, $httpBackend;
    beforeEach(module('EnglishFlashCard'));
    beforeEach(module('ngMaterial'));
    beforeEach(inject(function(_$httpBackend_, _$controller_, _$mdDialog_, _resourceBook_, _baseController_, _speech_, _commonToast_, _analytics_){
      $controller = _$controller_;
      analytics = _analytics_;
      $mdDialog = _$mdDialog_;
      resourceBook = _resourceBook_;
      baseController = _baseController_;
      speech = _speech_;
      commonToast = _commonToast_;
      $httpBackend = _$httpBackend_;
      $httpBackend.whenGET(/template.*/).respond(200, '');
    }));

    describe('#activate', function(){
      var spy;
      beforeEach(function(){
        spy = sinon.stub(analytics, 'sendCurrentPageView');
        $controller('booksEditDialogController', {
          analytics: analytics,
          $mdDialog:  $mdDialog,
          resourceBook: resourceBook,
          baseController: baseController,
          speech: speech,
          commonToast: commonToast,
          book: {voices: []}
        });
      });
      afterEach(function(){
        spy.restore();
      });
      it('call analytics', function(){
        expect(spy.calledWith('/books/edit/')).to.be.ok();
      });
    });

    describe('#remove', function(){
      var ctrl, spyDialog, spyToast;
      beforeEach(function(){
        spyDialog = sinon.stub($mdDialog, 'hide');
        spyToast = sinon.stub(commonToast, 'notice');
        ctrl = $controller('booksEditDialogController', {
          analytics: analytics,
          $mdDialog:  $mdDialog,
          resourceBook: resourceBook,
          baseController: baseController,
          speech: speech,
          commonToast: commonToast,
          book: {voices: [], id: '111'}
        });
        $httpBackend
          .when('DELETE', '/api/books/111')
          .respond('111');
      });
      afterEach(function(){
        spyDialog.restore();
        spyToast.restore();
      });
      it('request delete', function(){
        ctrl.remove();
        $httpBackend.flush();
        expect(spyDialog.called).to.be.ok();
        expect(spyToast.calledWith({notice: 'deleted book'})).to.be.ok();
      });
    });
    describe('#update', function(){
      var ctrl, spyDialog, spyToast, spyResource;
      beforeEach(function(){
        spyDialog = sinon.stub($mdDialog, 'hide');
        spyToast = sinon.stub(commonToast, 'notice');
        spyResource = sinon.spy(resourceBook, 'update');
        ctrl = $controller('booksEditDialogController', {
          analytics: analytics,
          $mdDialog:  $mdDialog,
          resourceBook: resourceBook,
          baseController: baseController,
          speech: speech,
          commonToast: commonToast,
          book: {voices: [], id: '111', name: 'test'}
        });
        $httpBackend
          .when('PUT', '/api/books/111')
          .respond();
      });
      afterEach(function(){
        spyDialog.restore();
        spyToast.restore();
        spyResource.restore();
      });
      it('request put', function(){
        ctrl.book.name = 'test 2';
        ctrl.selectedVoice = 'en-US_daniel';
        ctrl.update();
        $httpBackend.flush();
        expect(spyResource.calledWith('111', {name: 'test 2', voices: {lang: 'en-US', name: 'daniel'}})).to.be.ok();
        expect(spyDialog.called).to.be.ok();
        expect(spyToast.calledWith({notice: 'updated book'})).to.be.ok();
      });
    });

  });

})();
