(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('cardsDetailController', cardsDetailController);

  cardsDetailController.$inject = ['$location', '$mdInkRipple', 'resourceCard', 'resourceBook','baseController', '$routeParams', 'speech', 'card'];

  function cardsDetailController($location, $mdInkRipple, resourceCard, resourceBook, baseController, $routeParams, speech, card) {

    if(!card){
      $location.path('/login');
    }

    angular.extend(this, baseController);
    var vm = this;
    var book = resourceBook.getBook($routeParams.bookId);
    var selectedVoice = speech.getSelectedVoiceData(book.voices);
    vm.cardIterator = resourceCard.getIterator(card);
    vm.card = card;
    vm.onClickCard = onClickCard;
    vm.onClickNext = onClickNext;
    vm.onClickPrev = onClickPrev;

    activate();

    ////////////////
    function onClickNext() {
      var card = vm.cardIterator.getNext();
      if(card){
        vm.routers.card.goDetail(undefined, card.id);
      }
    }
    function onClickPrev() {
      var card = vm.cardIterator.getPrev();
      if(card){
        vm.routers.card.goDetail(undefined, card.id);
      }
    }
    function onClickCard(text) {
      speech.speak(text);
    }

    function activate() {
      speech.init({voice: selectedVoice});
      vm.pageChange(vm.APP_CONFIG.PAGE_NAME.CARD);
    }
  }
})();
