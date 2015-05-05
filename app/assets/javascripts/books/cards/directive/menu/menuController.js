(function() {
  'use strict';

  angular
    .module('cards')
    .controller('CardsMenuController', CardsMenuController);

  CardsMenuController.$inject = ['CommonControllerBaseController', 'CommonServiceCreateCardDialog'];

  function CardsMenuController(CommonControllerBaseController, CommonServiceCreateCardDialog) {

    angular.extend(this, CommonControllerBaseController);

    var vm = this;
    vm.createCardDialog = CommonServiceCreateCardDialog;

    activate();

    ////////////////

    function activate() {
    }
  }
})();
