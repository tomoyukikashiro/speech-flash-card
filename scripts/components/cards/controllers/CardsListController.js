(function() {

  'use strict';

  angular.module('cards')
    .controller('CardsListController',
      [
        '$scope',
        'CommonResourceCard',
        'CommonRouterBook',
        'CommonRouterCard',
        '$routeParams',
        CardsListController
      ]
    );

  function CardsListController($scope, CommonResourceCard, CommonRouterBook, CommonRouterCard, $routeParams) {
    $scope.name = 'cards list';
    $scope.cardList = [];

    // init data
    getCardList();

    // public functions
    $scope.$routeParams = $routeParams;
    $scope.deleteCard = function(cardId) {
      CommonResourceCard.resource.remove({cardId: cardId});
      getCardList(true);
    }
    $scope.routes = {
      Card : CommonRouterCard,
      Book : CommonRouterBook
    };

    // private
    function getCardList(isReload) {
      CommonResourceCard.getAll(isReload).then(function(response) {
        $scope.cardList = response.list;
      });
    }

  }

})();
