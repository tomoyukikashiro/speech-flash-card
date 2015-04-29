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
      var param = {
        bookId: $routeParams.bookId,
        cardId: $routeParams.cardId
      };
      CommonResourceCard.resource.get(param, function(response) {
        vm.card = response;
      });
      CommonServiceSpeech.init();
    }
  }
})();
