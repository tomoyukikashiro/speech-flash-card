(function() {
  'use strict';

  describe('cards/controller/detailController.js', function(){

    var ctrl;
    beforeEach(module('EnglishFlashCard'));

    describe('not loggedin', function(){
      var _$location, spy;
      beforeEach(inject(function($controller, $rootScope, $location, $mdInkRipple, resourceCard, resourceBook, baseController, $routeParams, speech) {
        _$location = $location;
        spy = sinon.stub(_$location, 'path');
        ctrl = $controller('cardsDetailController', {
          $rootScope: $rootScope,
          $location: $location,
          $mdInkRipple: $mdInkRipple,
          resourceCard: resourceCard,
          resourceBook: resourceBook,
          baseController: baseController,
          $routeParams: $routeParams,
          speech: speech,
          card: undefined,
          books: undefined,
          currentUser: undefined
        });
      }));
      it('redirect to login', function(){
        expect(spy.calledWith('/login')).to.be.ok();
        spy.restore();
      });
    });

    describe('do not have any books', function(){
      var _$location, spy;
      beforeEach(inject(function($controller, $rootScope, $location, $mdInkRipple, resourceCard, resourceBook, baseController, $routeParams, speech) {
        _$location = $location;
        spy = sinon.stub(_$location, 'path');
        ctrl = $controller('cardsDetailController', {
          $rootScope: $rootScope,
          $location: $location,
          $mdInkRipple: $mdInkRipple,
          resourceCard: resourceCard,
          resourceBook: resourceBook,
          baseController: baseController,
          $routeParams: $routeParams,
          speech: speech,
          card: undefined,
          books: undefined,
          currentUser: {}
        });
      }));
      it('redirect to login', function(){
        expect(spy.calledWith('/login')).to.be.ok();
        spy.restore();
      });
    });

    describe('do not have card', function(){
      var _$location, spy;
      beforeEach(inject(function($controller, $rootScope, $location, $mdInkRipple, resourceCard, resourceBook, baseController, $routeParams, speech) {
        _$location = $location;
        spy = sinon.stub(_$location, 'path');
        ctrl = $controller('cardsDetailController', {
          $rootScope: $rootScope,
          $location: $location,
          $mdInkRipple: $mdInkRipple,
          resourceCard: resourceCard,
          resourceBook: resourceBook,
          baseController: baseController,
          $routeParams: $routeParams,
          speech: speech,
          card: undefined,
          books: {},
          currentUser: {}
        });
      }));
      it('redirect to login', function(){
        expect(spy.calledWith('/books')).to.be.ok();
        spy.restore();
      });
    });

    describe('loggedin and have all data', function(){
      // test in feature test
    });

  });

})();
