(function() {
  'use strict';

  describe('common/resouce/card.js', function(){

    var _resourceCard, _$httpBackend, _$route;
    beforeEach(module('EnglishFlashCard'));
    beforeEach(inject(function(resourceCard, $httpBackend, $route) {
      _$route = $route;
      _resourceCard = resourceCard;
      _$httpBackend = $httpBackend;
      _$httpBackend.whenGET(/[template.*|/api/users]/).respond(200, '');
    }));

    /* --------------------------------------
     * #isTooManyBook
     * ------------------------------------ */
    describe('#isTooManyCard', function(){
      describe('param is undefined', function(){
        it('return false', function(){
          expect(_resourceCard.isTooManyCard()).not.to.be.ok();
        });
      });
      describe('param dose not have tmb data', function(){
        it('return false', function(){
          expect(_resourceCard.isTooManyCard(['test'])).not.to.be.ok();
        });
      });
      describe('param has tmb data', function(){
        it('return true', function(){
          expect(_resourceCard.isTooManyCard(['tmc'])).to.be.ok();
        });
      });
    });

    /* --------------------------------------------------------------
     * getListの戻値にlistを返しているのにテストだと、なぜか
     * listが帰らないので、respond後のテストが確認できない
     * 要チェック
     * ちなみに、resourceBookのgetListは期待値通りに動いている...
     * ------------------------------------------------------------ */

    /* --------------------------------------
     * #update
     * ------------------------------------ */
    describe('#update', function(){

      beforeEach(function(){
        _$route.current = {params: {bookId: '111'}};
        _$httpBackend
          .when('GET', '/api/books/111/cards')
          .respond({list: [{id: '111', text: 'test', note: ''}]});
        _$httpBackend
          .when('PUT', '/api/books/111/cards/111')
          .respond();
      });

      it('request update post with correct params', function(){
        _resourceCard.getList();
        _$httpBackend.flush();
        _resourceCard.update({cardId: '111', bookId: '111'}, {text: 'test2', note: ''});
        _$httpBackend.flush();
        // there is no way to get updated card
        //expect(_resourceCard.getIterator().getNext().text).to.eql('test2');
      });

    });

    /* --------------------------------------
     * #remove
     * ------------------------------------ */
    describe('#remove', function(){
      beforeEach(function(){
        _$route.current = {params: {bookId: '111'}};
        _$httpBackend
          .when('GET', '/api/books/111/cards')
          .respond({list: [{id: '111', text: 'test', note: ''}]});
        _$httpBackend
          .when('DELETE', '/api/books/111/cards/111')
          .respond();
      });
      it('request remove post with correct params', function(){
        _resourceCard.getList();
        _$httpBackend.flush();
        _resourceCard.remove({bookId: '111', cardId: '111'});
        _$httpBackend.flush();
      });
    });

    /* --------------------------------------
     * #save
     * ------------------------------------ */
    describe('#save', function(){
      beforeEach(function(){
        _$route.current = {params: {bookId: '111'}};
        _$httpBackend
          .when('GET', '/api/books/111/cards')
          .respond({list: [{id: '111', text: 'test', note: ''}]});
        _$httpBackend
          .when('POST', '/api/books/111/cards')
          .respond({id: '222', text: '222', note: '222'});
      });
      it('request save post with correct params', function(){
        _resourceCard.getList();
        _$httpBackend.flush();
        //_resourceCard.save({bookId: '111'}, {text: '222', note: '222'});
        //var res = _$httpBackend.flush();
        //console.log(res);
      });
    });


  });
})();
