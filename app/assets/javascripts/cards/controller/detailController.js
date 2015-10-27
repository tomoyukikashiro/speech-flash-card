(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .controller('cardsDetailController', cardsDetailController);

  cardsDetailController.$inject = ['$rootScope', '$location', '$mdInkRipple', 'resourceCard', 'resourceBook','baseController', '$routeParams', 'speech', 'card', 'currentUser', 'books'];

  function cardsDetailController($rootScope, $location, $mdInkRipple, resourceCard, resourceBook, baseController, $routeParams, speech, card, currentUser, books) {

    if(!currentUser || !books){
      $location.path('/login');
      return;
    }else if(!card){
      $location.path('/books');
      return;
    }

    angular.extend(this, baseController);
    var vm = this;
    var book = resourceBook.getBook($routeParams.bookId);
    var selectedVoice = speech.getSelectedVoiceData(book.voices);
    var changeCardEvent = 'changecard';
    vm.cardIterator = resourceCard.getIterator(card);
    vm.card = card;
    vm.onClickCard = onClickCard;
    vm.onClickNext = onClickNext;
    vm.onClickPrev = onClickPrev;
    vm.hasPrev = false;
    vm.hasNext = false;

    activate();

    ////////////////
    function onClickNext() {
      var card = vm.cardIterator.getNext();
      if(card){
        vm.routers.card.goDetail(undefined, card.id);
        $rootScope.$broadcast(changeCardEvent, card.id);
      }
    }
    function onClickPrev() {
      var card = vm.cardIterator.getPrev();
      if(card){
        vm.routers.card.goDetail(undefined, card.id);
        $rootScope.$broadcast(changeCardEvent, card.id);
      }
    }
    function onClickCard(text) {
      speech.speak(text);
    }
    function updateHas() {
      vm.hasPrev = vm.cardIterator.hasPrev();
      vm.hasNext = vm.cardIterator.hasNext();
    }

    function activate() {
      updateHas();
      vm.analytics.sendCurrentPageView('/cards/detail/');
      speech.init({voice: selectedVoice});
      $rootScope.$broadcast(changeCardEvent, card.id);
      vm.pageChange(vm.APP_CONFIG.PAGE_NAME.CARD);
    }
  }
})();
