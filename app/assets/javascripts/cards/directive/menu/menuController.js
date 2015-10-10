(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('cardsMenuController', cardsMenuController);

  cardsMenuController.$inject = ['baseController', 'createCardDialog', 'editCardDialog'];

  function cardsMenuController(baseController, createCardDialog, editCardDialog) {

    angular.extend(this, baseController);

    var vm = this;
    vm.menu = {
      isOpen: false
    };
    vm.createCardDialog = createCardDialog;
    vm.editCardDialog = editCardDialog;
  }
})();
