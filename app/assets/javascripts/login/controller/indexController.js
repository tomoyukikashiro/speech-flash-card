(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .controller('loginController', loginController);

  loginController.$inject = ['routerBook', 'resourceSession', 'currentUser'];

  function loginController(routerBook, resourceSession, currentUser) {

    if(currentUser){
      routerBook.goList();
      return;
    }

    var vm = this;
    vm.login = {};
    vm.loginSubmit = loginSubmit;

    function loginSubmit() {
      resourceSession.resource.save({}, {email: vm.login.email, password: vm.login.password})
      .$promise.then(function() {
        routerBook.goList();
      });
    }
  }

})();
