(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('booksEditDialogController', booksEditDialogController);

  booksEditDialogController.$inject = ['$mdDialog', 'resourceBook', 'baseController', 'book'];

  function booksEditDialogController($mdDialog, resourceBook, baseController, book) {
    angular.extend(this, baseController);
    var vm = this;
    vm.book = book;
    vm.remove = remove;
    vm.update = update;

    function remove() {
      resourceBook.remove(book.id)
        .then(function() {
          $mdDialog.hide();
        });
    }
    function update() {
      resourceBook.update(book.id, vm.book.name)
        .then(function() {
          $mdDialog.hide();
        });
    }
  }

})();
