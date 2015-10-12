(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('signupController', signupController);

  signupController.$inject = ['resourceUser', 'routerBook', 'currentUser'];

  function signupController(resourceUser, routerBook, currentUser) {

    if(currentUser){
      routerBook.goList();
    }

    var vm = this;
    vm.createSubmit = createSubmit;

    activate();

    ///
    function activate() {
      vm.signup = {};
    }

    function createSubmit() {
      resourceUser.resource.save({}, {
        user: {
          name: vm.signup.name,
          email: vm.signup.email,
          password: vm.signup.password,
          'password_confirmation': vm.signup.passwordConfirm
        }
      })
      .$promise.then(function() {
        routerBook.goList();
      });
    }
  }

})();