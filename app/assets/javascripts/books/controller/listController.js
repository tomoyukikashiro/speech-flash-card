(function() {
  'use strict';

  angular
    .module('books')
    .controller('BooksListController', BooksListController);

  BooksListController.$inject = [
    'CommonControllerBaseController', 'CommonResourceBook', 'CommonResourceSession',
    'books', 'CommonServiceCreateBookDialog', 'CommonServiceEditBookDialog'];

  function BooksListController(
      CommonControllerBaseController, CommonResourceBook, CommonResourceSession,
      books, CommonServiceCreateBookDialog, CommonServiceEditBookDialog) {

    angular.extend(this, CommonControllerBaseController);

    var vm = this;
    vm.list = books;
    vm.createBookDialog = CommonServiceCreateBookDialog;
    vm.editBookDialog = CommonServiceEditBookDialog;

  }
})();
