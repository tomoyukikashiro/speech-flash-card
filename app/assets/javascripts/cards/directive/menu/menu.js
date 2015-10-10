(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .directive('fcCardMenu', fcBookMenu);

  function fcBookMenu() {
    var directive = {
      link: link,
      restrict: 'E',
      templateUrl: 'templates/cards/menu.html',
      controller: 'cardsMenuController',
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
