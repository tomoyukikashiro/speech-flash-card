(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('cardsDetailController', cardsDetailController);

  cardsDetailController.$inject = ['$location', '$mdInkRipple', 'resourceCard', 'baseController', '$routeParams', 'serviceSpeech', 'card'];

  function cardsDetailController($location, $mdInkRipple, resourceCard, baseController, $routeParams, serviceSpeech, card) {

    if(!card){
      $location.path('/login');
    }

    angular.extend(this, baseController);
    var vm = this;
    vm.cardIterator = resourceCard.getIterator(card);
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
      serviceSpeech.speak(text);
    }

    function activate() {
      serviceSpeech.init();
      vm.pageChange(vm.APP_CONFIG.PAGE_NAME.CARD);
    }
  }
})();
