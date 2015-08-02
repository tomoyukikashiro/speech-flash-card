(function() {
  'use strict';

  angular
    .module('books')
    .controller('BooksListController', BooksListController);

  BooksListController.$inject = ['CommonControllerBaseController', 'CommonResourceBook', 'CommonResourceSession', 'books'];

  function BooksListController(CommonControllerBaseController, CommonResourceBook, CommonResourceSession, books) {

    angular.extend(this, CommonControllerBaseController);

    var vm = this;
    vm.list = books;

    ////////////////
    function logout() {
      CommonResourceSession.logout();
    }
  }
})();
