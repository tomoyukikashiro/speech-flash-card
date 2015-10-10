(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('booksListController', booksListController);

  booksListController.$inject = [
    '$location', 'baseController', 'resourceBook', 'resourceSession',
    'books', 'createBookDialog', 'editBookDialog'];

  function booksListController(
      $location, baseController, resourceBook, resourceSession,
      books, createBookDialog, editBookDialog) {

    if(!books){
      $location.path('/login');
    }

    angular.extend(this, baseController);

    var vm = this;
    vm.list = books;
    vm.createBookDialog = createBookDialog;
    vm.editBookDialog = editBookDialog;

    activate();

    function activate() {
      vm.pageChange(vm.APP_CONFIG.PAGE_NAME.BOOK);
    }

  }
})();
