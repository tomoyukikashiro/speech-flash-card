(function() {
  'use strict';

  angular
    .module('login')
    .controller('LoginIndexController', LoginIndexController);

  LoginIndexController.$inject = ['CommonResourceUser', 'CommonRouterBook', 'CommonResourceSession'];

  function LoginIndexController(CommonResourceUser, CommonRouterBook, CommonResourceSession) {
    var vm = this;
    vm.createSubmit = createSubmit;
    vm.loginSubmit = loginSubmit;

    activate();

    ///
    function activate() {
      vm.create = {};
      vm.login = {};
    }
    function createSubmit() {
      CommonResourceUser.resource.save({}, {
        user: {
          name: vm.create.name,
          email: vm.create.email,
          password: vm.create.password,
          'password_confirmation': vm.create.passwordConfirm
        }
      })
      .$promise.then(function() {
        CommonRouterBook.goList();
      });
    }
    function loginSubmit() {
      CommonResourceSession.resource.save({}, {email: vm.login.email, password: vm.login.password})
      .$promise.then(function() {
        CommonRouterBook.goList();
      });
    }
  }

})();
