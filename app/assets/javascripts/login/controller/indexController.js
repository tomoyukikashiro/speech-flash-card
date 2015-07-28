(function() {
  'use strict';

  angular
    .module('login')
    .controller('LoginIndexController', LoginIndexController);

  LoginIndexController.$inject = ['CommonRouterBook', 'CommonResourceSession'];

  function LoginIndexController(CommonRouterBook, CommonResourceSession) {
    var vm = this;
    vm.loginSubmit = loginSubmit;

    activate();

    ///
    function activate() {
      vm.login = {};
    }
    function loginSubmit() {
      CommonResourceSession.resource.save({}, {email: vm.login.email, password: vm.login.password})
      .$promise.then(function() {
        CommonRouterBook.goList();
      });
    }
  }

})();
