(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .controller('cardsDetailController', cardsDetailController);

  cardsDetailController.$inject = ['$rootScope', '$location', '$mdInkRipple', 'resourceCard', 'resourceBook','baseController', '$routeParams', 'speech', 'card'];

  function cardsDetailController($rootScope, $location, $mdInkRipple, resourceCard, resourceBook, baseController, $routeParams, speech, card) {

    if(!card){
      $location.path('/login');
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

    function activate() {
      vm.analytics.sendCurrentPageView('/cards/detail/');
      speech.init({voice: selectedVoice});
      $rootScope.$broadcast(changeCardEvent, card.id);
      vm.pageChange(vm.APP_CONFIG.PAGE_NAME.CARD);
    }
  }
})();
