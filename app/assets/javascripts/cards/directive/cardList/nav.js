(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .directive('cardList', cardList);

  function cardList() {
    var directive = {
      restrict: 'E',
      controller: 'cardListController',
      controllerAs: 'cardListCtrl',
      templateUrl: 'templates/cards/list.html',
      scope: {
        cardList: '='
      }
    };
    return directive;
  }
})();
