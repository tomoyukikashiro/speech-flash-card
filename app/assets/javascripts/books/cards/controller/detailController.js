(function() {
  'use strict';

  angular
    .module('cards')
    .controller('CardsDetailController', CardsDetailController);

  CardsDetailController.$inject = ['CommonResourceCard', 'CommonRouterCard', '$routeParams', 'CommonServiceSpeech'];

  function CardsDetailController(CommonResourceCard, CommonRouterCard, $routeParams, CommonServiceSpeech) {
    var vm = this;
    vm.onClickCard = onClickCard;
    vm.routers = {
      card: CommonRouterCard
    };

    activate();

    ////////////////
    function onClickCard(text) {
      CommonServiceSpeech.speak(text);
    }

    function activate() {
      CommonResourceCard.getCard($routeParams.bookId, $routeParams.cardId)
        .then(function(card) {
          vm.card = card;
        });
      CommonServiceSpeech.init();
    }
  }
})();
