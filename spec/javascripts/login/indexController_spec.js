(function() {
  'use strict';

  describe('login/indexController.js', function(){

    beforeEach(module('EnglishFlashCard'));
    var ctrl;

    describe('loggedin', function(){
      var _routerBook, spy;
      beforeEach(inject(function($controller, routerBook, resourceSession) {
        _routerBook = routerBook;
        spy = sinon.stub(routerBook, 'goList');
        ctrl = $controller('loginController', {
          resourceSession: resourceSession,
          routerBook: routerBook,
          currentUser: {}
        });
      }));
      it('redirect to bookList', function(){
        expect(spy.called).to.be.ok();
        spy.restore();
      });
    });

    // 現状login formは存在しないのでスキップ
    xdescribe('loggedin', function(){
      var _resourceSession;
      beforeEach(inject(function($controller, routerBook, resourceSession) {
        _resourceSession = resourceSession;
        ctrl = $controller('loginController', {
          resourceSession: resourceSession,
          routerBook: routerBook,
          currentUser: undefined
        });
      }));
      it('redirect to bookList', function(){
        var spy = sinon.stub(_resourceSession.resource, 'save');
        ctrl.login.email = 'email@email.com';
        ctrl.login.password = 'password';
        ctrl.loginSubmit();
        expect(spy.calledWith({}, {email: 'email@email.com', password: 'password'})).to.be.ok();
        spy.restore();
      });
    });

  });
})();
