(function() {
  'use strict';

  angular
    .module('cards')
    .controller('CardsDetailController', CardsDetailController);

  CardsDetailController.$inject = ['CommonResourceCard', 'CommonControllerBaseController', '$routeParams', 'CommonServiceSpeech', 'card'];

  function CardsDetailController(CommonResourceCard, CommonControllerBaseController, $routeParams, CommonServiceSpeech, card) {
    angular.extend(this, CommonControllerBaseController);
    var vm = this;
    vm.cardIterator = CommonResourceCard.getIterator(card);
    vm.card = card;
    vm.onClickCard = onClickCard;
    vm.onClickNext = onClickNext;
    vm.onClickPrev = onClickPrev;

    activate();

    ////////////////
    function onClickNext() {
      var card = vm.cardIterator.getNext();
      vm.routers.card.goDetail(undefined, card.id);
    }
    function onClickPrev() {
      var card = vm.cardIterator.getPrev();
      vm.routers.card.goDetail(undefined, card.id);
    }
    function onClickCard(text) {
      CommonServiceSpeech.speak(text);
    }

    function activate() {
      CommonServiceSpeech.init();
    }
  }
})();
