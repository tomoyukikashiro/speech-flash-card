(function() {
  'use strict';

  angular
    .module('cards')
    .controller('CardsListController', CardsListController);

  CardsListController.$inject = ['CommonResourceCard', 'CommonControllerBaseController', '$routeParams', 'cards'];

  function CardsListController(CommonResourceCard, CommonControllerBaseController, $routeParams, cards) {
    angular.extend(this, CommonControllerBaseController);
    var vm = this;
    vm.list = cards;
    vm.$routeParams = $routeParams;
    vm.deleteCard = deleteCard;

    ////////////////
    function deleteCard(cardId) {
      CommonResourceCard.resource.remove({bookId: $routeParams.bookId, cardId: cardId});
      getCardList();
    }

    function getCardList() {
      CommonResourceCard.getList().then(function(res) {
        vm.list = res.list;
      });
    }
  }
})();
