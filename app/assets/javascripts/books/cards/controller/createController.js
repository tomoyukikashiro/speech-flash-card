(function() {
  'use strict';

  angular
    .module('cards')
    .controller('CardsCreateController', CardsCreateController);

  CardsCreateController.$inject = ['CommonControllerBaseController', 'CommonServiceCreateCardDialog'];

  function CardsCreateController(CommonControllerBaseController, CommonServiceCreateCardDialog) {
    angular.extend(this, CommonControllerBaseController);
    activate();
    ////////////////
    function activate() {
      CommonServiceCreateCardDialog.show();
    }
  }
})();
