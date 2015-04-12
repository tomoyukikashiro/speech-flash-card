(function() {

  'use strict';

  angular.module('cards')
    .controller('CardsDetailController',
      [
        '$scope',
        'CommonResourceCard',
        'CommonRouterCard',
        '$routeParams',
        'CommonServiceSpeech',
        CardsDetailController
      ]
    );

  function CardsDetailController($scope, CommonResourceCard, CommonRouterCard, $routeParams, CommonServiceSpeech) {
    $scope.name = 'cards detail';

    // init
    CommonResourceCard.getCard($routeParams.bookId, $routeParams.cardId)
      .then(function(card) {
        $scope.card = card;
      });
    CommonServiceSpeech.init();

    // public
    $scope.routes = {
      Card : CommonRouterCard
    };

    $scope.onClickCard = function(words) {
      CommonServiceSpeech.speak(words);
    };


  }
})();
