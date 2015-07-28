(function() {
  'use strict';

  angular
    .module('signup')
    .controller('SignupIndexController', SignupIndexController);

  SignupIndexController.$inject = ['CommonResourceUser', 'CommonRouterBook'];

  function SignupIndexController(CommonResourceUser, CommonRouterBook) {
    var vm = this;
    vm.createSubmit = createSubmit;

    activate();

    ///
    function activate() {
      vm.signup = {};
    }

    function createSubmit() {
      CommonResourceUser.resource.save({}, {
        user: {
          name: vm.signup.name,
          email: vm.signup.email,
          password: vm.signup.password,
          'password_confirmation': vm.signup.passwordConfirm
        }
      })
      .$promise.then(function() {
        CommonRouterBook.goList();
      });
    }
  }

})();
