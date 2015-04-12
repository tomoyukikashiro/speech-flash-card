(function() {

  'use strict';

  angular.module('cards')
    .controller('CardsCreateController',
      [
        '$scope',
        '$routeParams',
        'CommonResourceCard',
        'CommonRouterCard',
        CardsCreateController
      ]
    );

  function CardsCreateController($scope, $routeParams, CommonResourceCard, CommonRouterCard) {
    $scope.name = 'cards';
    // public
    $scope.submit = function() {
      var param = {
        bookId: $routeParams.bookId
      };
      var postData = {
        words : $scope.words
      };
      CommonResourceCard.resource.save(param, postData, function(response) {
        CommonRouterCard.goDetail($routeParams.bookId, response.id);
      });
    }
  }

})();
