(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('booksCreateDialogController', booksCreateDialogController);

  booksCreateDialogController.$inject = ['resourceBook', 'baseController'];

  function booksCreateDialogController(resourceBook, baseController) {
    angular.extend(this, baseController);
    var vm = this;
    vm.submit = submit;

    ////
    function submit() {
      resourceBook.resource.save({}, {name: vm.bookName}, function(response) {
        vm.routers.card.goCreate(response.id);
      });
    }
  }

})();
