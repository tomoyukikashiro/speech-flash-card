(function() {
  'use strict';

  angular
    .module('cards')
    .controller('CardsDetailController', CardsDetailController);

  CardsDetailController.$inject = ['CommonResourceCard', 'CommonControllerBaseController', '$routeParams', 'CommonServiceSpeech'];

  function CardsDetailController(CommonResourceCard, CommonControllerBaseController, $routeParams, CommonServiceSpeech) {
    angular.extend(this, CommonControllerBaseController);
    var vm = this;
    vm.onClickCard = onClickCard;

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
