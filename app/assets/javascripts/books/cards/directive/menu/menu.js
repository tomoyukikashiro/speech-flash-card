(function() {
  'use strict';

  angular
    .module('cards')
    .directive('fcCardMenu', fcBookMenu);

  function fcBookMenu() {
    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'templates/cards/menu.html',
      controller: 'CardsMenuController',
      controllerAs: 'cardsMenu',
      scope: {
        card: '='
      }
    };
    return directive;

    function link(scope, element, attrs) {
    }
  }
})();
