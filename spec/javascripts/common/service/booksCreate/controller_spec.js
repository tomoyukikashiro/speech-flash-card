(function() {
  'use strict';

  describe('common/service/booksCreate/controller.js', function(){
    var controller, spy, spySpeech, spyResourceBook, _$httpBackend, _commonToast, _commonDialog, _$mdDialog;
    beforeEach(module('SpeechFlashCard'));
    beforeEach(module('ngMaterial'));
    beforeEach(inject(function($controller, resourceBook, baseController, $mdDialog, speech, commonDialog, commonToast, analytics, $httpBackend){
      spy = sinon.stub(analytics, 'sendCurrentPageView');
      _$mdDialog = $mdDialog;
      _commonToast = commonToast;
      _commonDialog = commonDialog;
      _$httpBackend = $httpBackend;
      _$httpBackend.whenGET(/template.*/).respond(200, '');
      spySpeech = sinon.stub(speech, 'getVoiceParam').returns({lang: 'en-US', name: 'davis'});
      spyResourceBook = sinon.spy(resourceBook, 'save');
      controller = $controller('booksCreateDialogController', {
        resourceBook: resourceBook,
        baseController: baseController,
        $mdDialog: $mdDialog,
        speech: speech,
        commonDialog: commonDialog,
        commonToast: commonToast,
        isFirst: false,
        analytics: analytics
      });
    }));
    afterEach(function(){
      spy.restore();
      spySpeech.restore();
      spyResourceBook.restore();
    });
    it('request page view', function(){
      expect(spy.calledWith('/books/create/')).to.be.ok();
    });
    describe('#submit', function(){
      describe('success', function(){
        var spyToast, spyMd;
        beforeEach(function(){
          spyToast = sinon.stub(_commonToast, 'notice');
          spyMd = sinon.stub(_$mdDialog, 'hide');
          controller.bookName = 'test book';
          _$httpBackend
            .when('POST', '/api/books')
            .respond(200);
        });
        afterEach(function(){
          spyToast.restore();
          spyMd.restore();
        });
        it('sumit data', function(){
          controller.submit();
          expect(spyResourceBook.calledWith({book: {name: 'test book', voices: {lang: 'en-US', name: 'davis'}}})).to.be.ok();
          _$httpBackend.flush();
          expect(spyToast.calledWith({notice: 'created book'})).to.be.ok();
          expect(spyMd.called).to.be.ok();
        });
      });

      describe('error', function(){
        var spyDialog;
        beforeEach(function(){
          spyDialog = sinon.stub(_commonDialog, 'alert');
          controller.bookName = 'test book';
          _$httpBackend
            .when('POST', '/api/books')
            .respond(500, ['tmb']);
        });
        afterEach(function(){
          spyDialog.restore();
        });
        it('sumit data', function(){
          controller.submit();
          expect(spyResourceBook.calledWith({book: {name: 'test book', voices: {lang: 'en-US', name: 'davis'}}})).to.be.ok();
          _$httpBackend.flush();
          expect(spyDialog.calledWith({content: 'Bookはこれ以上つくれません'})).to.be.ok();
        });
      });
    });
  });
})();
