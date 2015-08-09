(function() {
  'use strict';

  angular
    .module('cards')
    .controller('CardsMenuController', CardsMenuController);

  CardsMenuController.$inject = ['CommonControllerBaseController', 'CommonServiceCreateCardDialog', 'CommonServiceEditCardDialog'];

  function CardsMenuController(CommonControllerBaseController, CommonServiceCreateCardDialog, CommonServiceEditCardDialog) {

    angular.extend(this, CommonControllerBaseController);

    var vm = this;
    vm.menu = {
      isOpen: false
    };
    vm.createCardDialog = CommonServiceCreateCardDialog;
    vm.editCardDialog = CommonServiceEditCardDialog;

    activate();

    ////////////////

    function activate() {
    }
  }
})();
