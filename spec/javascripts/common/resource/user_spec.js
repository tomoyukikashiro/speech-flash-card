(function() {

  'use strict';

  describe('resource/user.js', function(){

    var _$httpBackend, _resourceUser;
    beforeEach(module('EnglishFlashCard'));
    beforeEach(inject(function($httpBackend, resourceUser) {
      _$httpBackend = $httpBackend;
      _resourceUser = resourceUser;
      _$httpBackend.whenGET(/template.*/).respond(200, '');
      _$httpBackend
        .when('GET', '/api/users')
        .respond({id: '111', name: 'test name'});

    }));

    describe('#checkCurrent', function(){
      describe('if it is first request', function(){
        beforeEach(function(){
          expect(_resourceUser.getData()).to.be(undefined);
        });
        it('request to api and return user data', function(){
          _resourceUser.checkCurrent();
          _$httpBackend.flush();
          expect(_resourceUser.getData()).to.eql({id: '111', name: 'test name'});
        });
      });
      describe('if it is second request', function(){
        beforeEach(function(){
          _resourceUser.checkCurrent();
          _$httpBackend.flush();
          expect(_resourceUser.getData()).not.to.be(undefined);
        });
        it('return cached data', function(){
          _resourceUser.checkCurrent();
          expect(_resourceUser.getData()).to.eql({id: '111', name: 'test name'});
        });
      });
    });
    describe('#clearCache', function(){
      beforeEach(function(){
        _resourceUser.checkCurrent();
        _$httpBackend.flush();
        expect(_resourceUser.getData()).not.to.be(undefined);
      });
      it('clear cached data', function(){
        expect(_resourceUser.clearCache()).to.be(null);
      });
    });

  });

})();
