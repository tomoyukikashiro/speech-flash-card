(function() {
  'use strict';

  angular
    .module('books')
    .controller('BooksListController', BooksListController);

  BooksListController.$inject = ['CommonResourceBook', 'CommonRouterBook', 'CommonRouterCard'];

  function BooksListController(CommonResourceBook, CommonRouterBook, CommonRouterCard) {
    var vm = this;
    vm.list = [];
    vm.routers = {
      card: CommonRouterCard,
      book: CommonRouterBook
    };

    activate();
    ////////////////

    function activate() {
      CommonResourceBook.resource.get({}, function(response) {
        vm.list = response.list;
      });
    }
  }
})();
