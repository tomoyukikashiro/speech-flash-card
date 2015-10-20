(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('booksListController', booksListController);

  booksListController.$inject = [
    '$location', 'baseController', 'resourceBook', 'resourceSession',
    'books', 'createBookDialog', 'editBookDialog', 'createCardDialog'];

  function booksListController(
      $location, baseController, resourceBook, resourceSession,
      books, createBookDialog, editBookDialog, createCardDialog) {

    if(!books){
      $location.path('/login');
      return;
    }

    angular.extend(this, baseController);

    var vm = this;
    vm.list = books;
    vm.createBookDialog = createBookDialog;
    vm.editBookDialog = editBookDialog;
    vm.createCardDialog = createCardDialog;

    activate();

    function activate() {
      vm.pageChange(vm.APP_CONFIG.PAGE_NAME.BOOK);
      vm.analytics.sendCurrentPageView('/books/');
      if(books.length === 0){
        createBookDialog.show(undefined, true);
      }
    }

  }
})();
