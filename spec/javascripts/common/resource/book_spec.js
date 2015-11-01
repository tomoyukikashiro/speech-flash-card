(function() {
  'use strict';

  describe('common/resource/book.js', function(){

    var _resourceBook, _$httpBackend;
    beforeEach(module('SpeechFlashCard'));
    beforeEach(inject(function(resourceBook, $httpBackend) {
      _resourceBook = resourceBook;
      _$httpBackend = $httpBackend;
      _$httpBackend.whenGET(/template.*/).respond(200, '');
    }));

    /* --------------------------------------
     * #isTooManyBook
     * ------------------------------------ */
    describe('#isTooManyBook', function(){
      beforeEach(function(){
        _$httpBackend
          .when('GET', '/api/books')
          .respond({list: [{id: '111', name: 'test book'}]});
      });
      describe('param is undefined', function(){
        it('return false', function(){
          expect(_resourceBook.isTooManyBook()).not.to.be.ok();
        });
      });
      describe('param dose not have tmb data', function(){
        it('return false', function(){
          expect(_resourceBook.isTooManyBook(['test'])).not.to.be.ok();
        });
      });
      describe('param has tmb data', function(){
        it('return true', function(){
          expect(_resourceBook.isTooManyBook(['tmb'])).to.be.ok();
        });
      });
    });

    /* --------------------------------------
     * #update
     * ------------------------------------ */
    describe('#update', function(){
      beforeEach(function(){
        _$httpBackend
          .when('GET', '/api/books')
          .respond({list: [{id: '111', name: 'test book'}]});
        _$httpBackend
          .when('PUT', '/api/books/111')
          .respond();
      });
      it('request update post with correct param', function(){
        _resourceBook.getList();
        _$httpBackend.flush();
        _resourceBook.update('111', {name: 'test book2', voices: {name: '', lang:''}});
        _$httpBackend.flush();
        expect(_resourceBook.getBook('111').name).to.eql('test book2');
      });
    });

    /* --------------------------------------
     * #save
     * ------------------------------------ */
    describe('#save', function(){
      beforeEach(function(){
        _$httpBackend
          .when('POST', '/api/books')
          .respond({id: '222', name: 'test book2'});
      });
      it('add data', function(){
        _resourceBook.save({name: 'test book2'});
        _$httpBackend.flush();
        var res = _resourceBook.getBook('222');
        expect(res.name).to.eql('test book2');
      });
    });
    /* --------------------------------------
     * #remove
     * ------------------------------------ */
    describe('#remove', function(){
       beforeEach(function(){
        _$httpBackend
          .when('GET', '/api/books')
          .respond({list: [{id: '111', name: 'test book'}]});
        _$httpBackend
          .when('DELETE', '/api/books/111')
          .respond('111');
      });
      it('data is removed', function(){
        _resourceBook.remove('111');
        _$httpBackend.flush();
        var res = _resourceBook.getBook('222');
        expect(res).to.eql(undefined);
      });
    });
    /* --------------------------------------
     * #getList
     * ------------------------------------ */
    describe('#getList', function(){
      describe('if there is no data', function(){
        beforeEach(function(){
          _$httpBackend
            .when('GET', '/api/books')
            .respond(undefined);
        });
        it('return empty array', function(){
          _resourceBook.getList();
          _$httpBackend.flush();
          var res = _resourceBook.getBook('111');
          expect(res).to.eql(undefined);
        });
      });
      describe('if there a data', function(){
        beforeEach(function(){
          _$httpBackend
            .when('GET', '/api/books')
            .respond({list: [{id: '111', name: 'test book'}]});
        });
        it('return array which contain data', function(){
          _resourceBook.getList();
          _$httpBackend.flush();
          var res = _resourceBook.getBook('111');
          expect(res).to.eql({id: '111', name: 'test book'});
        });
      });
    });

    /* --------------------------------------
     * #getBook
     * ------------------------------------ */
    describe('#getBook', function(){
      describe('if the data exist', function(){
        beforeEach(function(){
          _$httpBackend
            .when('GET', '/api/books')
            .respond({list: [{id: '111', name: 'test book'}]});
        });
        it('return data', function(){
          _resourceBook.getList();
          _$httpBackend.flush();
          var res = _resourceBook.getBook('111');
          expect(res).to.eql({id: '111', name: 'test book'});
        });
      });
      describe('if the data dose not exist', function(){
        beforeEach(function(){
          _$httpBackend
            .when('GET', '/api/books')
            .respond();
        });
        it('return data', function(){
          _resourceBook.getList();
          _$httpBackend.flush();
          var res = _resourceBook.getBook('111');
          expect(res).to.eql(undefined);
        });
      });
    });
  });

})();
