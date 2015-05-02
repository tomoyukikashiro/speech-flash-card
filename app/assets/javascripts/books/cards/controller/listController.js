(function() {
  'use strict';

  angular
    .module('cards')
    .controller('CardsListController', CardsListController);

  CardsListController.$inject = ['CommonResourceCard', 'CommonControllerBaseController', '$routeParams'];

  function CardsListController(CommonResourceCard, CommonControllerBaseController, $routeParams) {
    angular.extend(this, CommonControllerBaseController);
    var vm = this;
    vm.list = [];
    vm.$routeParams = $routeParams;
    vm.deleteCard = deleteCard;

    activate();

    ////////////////

    function activate() {
       getCardList();
    }

    function deleteCard(cardId) {
      CommonResourceCard.resource.remove({bookId: $routeParams.bookId, cardId: cardId});
      getCardList(true);
    }

    function getCardList(isReload) {
      CommonResourceCard.getAll(isReload).then(function(response) {
        vm.list = response.list;
      });
    }
  }
})();
