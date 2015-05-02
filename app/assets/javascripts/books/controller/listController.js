(function() {
  'use strict';

  angular
    .module('books')
    .controller('BooksListController', BooksListController);

  BooksListController.$inject = ['CommonControllerBaseController', 'CommonResourceBook', 'CommonResourceSession'];

  function BooksListController(CommonControllerBaseController, CommonResourceBook, CommonResourceSession) {

    angular.extend(this, CommonControllerBaseController);

    var vm = this;
    vm.list = [];
    vm.onClickLogout = logout;

    activate();
    ////////////////
    function logout() {
      CommonResourceSession.logout();
    }

    function activate() {
      CommonResourceBook.resource.get({}, function(response) {
        vm.list = response.list;
      });
    }
  }
})();
