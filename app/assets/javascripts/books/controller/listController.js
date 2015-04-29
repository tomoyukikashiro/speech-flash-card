(function() {
  'use strict';

  angular
    .module('books')
    .controller('BooksListController', BooksListController);

  BooksListController.$inject = ['CommonResourceBook', 'CommonRouterBook', 'CommonRouterCard', 'CommonResourceSession'];

  function BooksListController(CommonResourceBook, CommonRouterBook, CommonRouterCard, CommonResourceSession) {
    var vm = this;
    vm.list = [];
    vm.onClickLogout = logout;
    vm.routers = {
      card: CommonRouterCard,
      book: CommonRouterBook
    };

    activate();
    ////////////////
    function logout() {
      CommonResourceSession.logout();
    }

    function activate() {
      CommonResourceBook.resource.get({}, function(response) {
        vm.list = response;
      });
    }
  }
})();
