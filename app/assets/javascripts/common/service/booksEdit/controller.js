(function() {
  'use strict';

  angular
    .module('common.service.booksEdit.dialog')
    .controller('CommonServiceBooksEditDialogController', CommonServiceBooksEditDialogController);

  CommonServiceBooksEditDialogController.$inject = ['$mdDialog', 'CommonResourceBook', 'CommonControllerBaseController', 'book'];

  function CommonServiceBooksEditDialogController($mdDialog, CommonResourceBook, CommonControllerBaseController, book) {
    angular.extend(this, CommonControllerBaseController);
    var vm = this;
    vm.book = book;
    vm.remove = remove;
    vm.update = update;

    function remove() {
      CommonResourceBook.remove(book.id)
        .then(function() {
          $mdDialog.hide();
        });
    }
    function update() {
      CommonResourceBook.update(book.id, vm.book.name)
        .then(function() {
          $mdDialog.hide();
        });
    }
  }

})();
