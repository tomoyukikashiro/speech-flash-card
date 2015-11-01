(function() {

  'use strict';

  describe('common/router/book.js', function(){

    var _routerBook, _$location;
    beforeEach(module('SpeechFlashCard'));
    beforeEach(inject(function(routerBook, $location) {
      _routerBook = routerBook;
      _$location = $location;
    }));

    describe('#getList', function(){
      it('return /books/', function(){
        expect(_routerBook.getList()).to.equal('/books/');
      });
    });

    describe('#goList', function(){
      it('call $location.path with /books/', function(){
        var spy = sinon.stub(_$location, 'path');
        _routerBook.goList();
        expect(spy.calledWith('/books/')).to.be.ok();
        spy.restore();
      });
    });
  });

})();
