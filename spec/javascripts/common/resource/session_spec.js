(function() {

  'use strict';

  describe('common/resource/session.js', function(){

    var _$httpBackend, _resourceSession, _resourceUser;
    beforeEach(module('EnglishFlashCard'));
    beforeEach(inject(function($httpBackend, resourceSession, resourceUser) {
      _$httpBackend = $httpBackend;
      _resourceSession = resourceSession;
      _resourceUser = resourceUser;
      _$httpBackend.whenGET(/template.*/).respond(200, '');
    }));

    describe('#logout', function(){
      beforeEach(function(){
        _$httpBackend
          .when('GET', '/api/users')
          .respond({id: '111', name: 'test name'});
        _$httpBackend
          .when('DELETE', '/api/sessions')
          .respond();
      });
      it('after loggedout cached user data is removed', function(){
        _resourceUser.checkCurrent();
        _$httpBackend.flush();
        expect(_resourceUser.getData()).to.eql({id: '111', name: 'test name'});
        _resourceSession.logout();
        _$httpBackend.flush();
        expect(_resourceUser.getData()).to.eql(null);
      });
    });

  });

})();
