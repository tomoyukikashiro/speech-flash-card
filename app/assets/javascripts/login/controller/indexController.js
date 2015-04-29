(function() {
  'use strict';

  angular
    .module('login')
    .controller('LoginIndexController', LoginIndexController);

  LoginIndexController.$inject = ['CommonResourceUser', 'CommonRouterBook'];

  function LoginIndexController(CommonResourceUser, CommonRouterBook) {
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
      CommonResourceUser.resource.save({
        user: {
          name: vm.create.name,
          email: vm.create.email,
          password: vm.create.password,
          'password_confirmation': vm.create.passwordConfirm
        }
      }, function() {
        CommonRouterBook.goList();
      },
      function(res) {
        console.log(res);
      });
    }
    function loginSubmit() {
    }
  }

})();