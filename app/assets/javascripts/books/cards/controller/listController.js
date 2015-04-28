(function() {
  'use strict';

  angular
    .module('cards')
    .controller('CardsListController', CardsListController);

  CardsListController.$inject = ['CommonResourceCard', 'CommonRouterBook', 'CommonRouterCard', '$routeParams'];

  function CardsListController(CommonResourceCard, CommonRouterBook, CommonRouterCard, $routeParams) {
    var vm = this;
    vm.cardList = [];
    vm.$routeParams = $routeParams;
    vm.deleteCard = deleteCard;
    vm.routers = {
      card: CommonRouterCard,
      book: CommonRouterBook
    };

    activate();

    ////////////////

    function activate() {
       getCardList();
    }

    function deleteCard(cardId) {
      CommonResourceCard.resource.remove({cardId: cardId});
      getCardList(true);
    }

    function getCardList(isReload) {
      CommonResourceCard.getAll(isReload).then(function(response) {
        vm.cardList = response.list;
      });
    }
  }
})();
