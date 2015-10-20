(function() {
  'use strict';

  describe('books/controller/listController.js', function(){
    var ctrl;
    beforeEach(module('EnglishFlashCard'));

    describe('books prop is undefined', function(){
      var _$location, spy;
      beforeEach(inject(function($controller, $location, baseController, resourceBook, resourceSession,
        createBookDialog, editBookDialog, createCardDialog) {
          _$location = $location;
          spy = sinon.stub(_$location, 'path');
          ctrl = $controller('booksListController', {
            $location: $location,
            books: undefined,
            baseController: baseController,
            resourceBook: resourceBook,
            resourceSession: resourceSession,
            createBookDialog: createBookDialog,
            editBookDialog: editBookDialog,
            createCardDialog: createCardDialog
          });
      }));
      it('redirect to login', function(){
        expect(spy.calledWith('/login')).to.be.ok();
        spy.restore();
      });
    });

    describe('books prop exist', function(){
      var spy1, spy2, _config;
      beforeEach(inject(function($controller, $location, baseController, resourceBook, resourceSession,
        createBookDialog, editBookDialog, createCardDialog, analytics, APP_CONFIG) {
          spy1 = sinon.stub(baseController, 'pageChange');
          spy2 = sinon.stub(analytics, 'sendCurrentPageView');
          _config = APP_CONFIG;
          ctrl = $controller('booksListController', {
            $location: $location,
            books: [{}],
            baseController: baseController,
            resourceBook: resourceBook,
            resourceSession: resourceSession,
            createBookDialog: createBookDialog,
            editBookDialog: editBookDialog,
            createCardDialog: createCardDialog
          });
      }));
      it('call init methods', function(){
        expect(spy1.calledWith(_config.PAGE_NAME.BOOK)).to.be.ok();
        expect(spy2.calledWith('/books/')).to.be.ok();
        spy1.restore();
        spy2.restore();
      });
    });

    describe('books prop is empty Array', function(){
      var spy;
      beforeEach(inject(function($controller, $location, baseController, resourceBook, resourceSession,
        createBookDialog, editBookDialog, createCardDialog) {
          spy = sinon.stub(createBookDialog, 'show');
          ctrl = $controller('booksListController', {
            $location: $location,
            books: [],
            baseController: baseController,
            resourceBook: resourceBook,
            resourceSession: resourceSession,
            createBookDialog: createBookDialog,
            editBookDialog: editBookDialog,
            createCardDialog: createCardDialog
          });
      }));
      it('call book create dialog', function() {
        expect(spy.calledWith(undefined, true)).to.be.ok();
        spy.restore();
      });
    });
  });
})();
