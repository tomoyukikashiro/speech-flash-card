(function() {

  'use strict';

  angular.module('cards')
    .controller('CardsDetailController',
      [
        '$scope',
        'CommonResourceCard',
        'CommonRouterCard',
        '$routeParams',
        CardsDetailController
      ]
    );

  function CardsDetailController($scope, CommonResourceCard, CommonRouterCard, $routeParams) {
    $scope.name = 'cards detail';

    // init
    CommonResourceCard.getCard($routeParams.bookId, $routeParams.cardId)
      .then(function(card) {
        $scope.card = card;
      });

    // public
    $scope.routes = {
      Card : CommonRouterCard
    };

  }
})();
