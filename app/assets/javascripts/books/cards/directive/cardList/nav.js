(function() {
  'use strict';

  angular
    .module('cards')
    .directive('cardList', CardList);

  function CardList() {
    var directive = {
      restrict: 'E',
      controller: 'CardListController',
      controllerAs: 'cardListCtrl',
      templateUrl: 'templates/cards/list.html',
      scope: {
        cardList: '='
      }
    };
    return directive;
  }
})();
