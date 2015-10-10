(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('booksCreateDialogController', booksCreateDialogController);

  booksCreateDialogController.$inject = ['resourceBook', 'baseController', '$mdDialog'];

  function booksCreateDialogController(resourceBook, baseController, $mdDialog) {
    angular.extend(this, baseController);
    var vm = this;
    vm.submit = submit;

    ////
    function submit() {
      resourceBook.resource.save({}, {name: vm.bookName}, function(response) {
        $mdDialog.hide();
      });
    }
  }

})();
