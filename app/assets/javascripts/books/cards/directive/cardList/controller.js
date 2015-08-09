(function() {
  'use strict';

  angular
    .module('cards')
    .controller('CardListController', CardListController);

  CardListController.$inject = ['CommonControllerBaseController', 'CardList'];

  function CardListController(CommonControllerBaseController, CardList) {
    angular.extend(this, CommonControllerBaseController);

    var vm = this;
    vm.changeCard = changeCard;

    function changeCard(id) {
      vm.routers.card.goDetail(null,id);
      CardList.close();
    }
  }

})();
