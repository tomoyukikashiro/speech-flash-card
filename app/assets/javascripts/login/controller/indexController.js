(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('loginController', loginController);

  loginController.$inject = ['routerBook', 'resourceSession', 'currentUser'];

  function loginController(routerBook, resourceSession, currentUser) {

    if(currentUser){
      routerBook.goList();
    }

    var vm = this;
    vm.loginSubmit = loginSubmit;

    activate();

    ///
    function activate() {
      vm.login = {};
    }
    function loginSubmit() {
      resourceSession.resource.save({}, {email: vm.login.email, password: vm.login.password})
      .$promise.then(function() {
        routerBook.goList();
      });
    }
  }

})();
