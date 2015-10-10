(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('cardListController', cardListController);

  cardListController.$inject = ['baseController', 'cardList'];

  function cardListController(baseController, cardList) {
    angular.extend(this, baseController);

    var vm = this;
    vm.changeCard = changeCard;

    function changeCard(id) {
      vm.routers.card.goDetail(null,id);
      cardList.close();
    }
  }

})();
