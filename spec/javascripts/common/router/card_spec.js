(function() {

  'use strict';

  describe('common/router/card.js', function(){

    var _routerCard, _$location, _$routeParams;
    beforeEach(module('EnglishFlashCard'));
    beforeEach(inject(function(routerCard, $location, $routeParams) {
      _routerCard = routerCard;
      _$location = $location;
      _$routeParams = $routeParams;
    }));

    describe('#goDetail', function(){
      var spy;
      beforeEach(function(){
        spy = sinon.stub(_$location, 'path');
      });
      afterEach(function(){
        spy.restore();
      });
      describe('if you do not pass a bookId', function(){
        beforeEach(function(){
          _$routeParams.bookId = '111';
        });
        afterEach(function(){
          delete _$routeParams.bookId;
        });
        it('go to card detail page with $routeParam.bookId', function(){
          _routerCard.goDetail(undefined, 222);
          expect(spy.calledWith('/books/111/cards/222/')).to.be.ok();
        });
      });
      describe('if you pass a bookId', function(){
        it('go to card detail page with passed bookId', function(){
          _routerCard.goDetail(333, 444);
          expect(spy.calledWith('/books/333/cards/444/')).to.be.ok();
        });
      });
    });

  });

})();
