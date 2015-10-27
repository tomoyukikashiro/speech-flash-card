(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .directive('fcCardMenu', fcBookMenu);

  function fcBookMenu() {
    var directive = {
      restrict: 'E',
      templateUrl: 'templates/cards/menu.html',
      controller: 'cardsMenuController',
      controllerAs: 'cardsMenu',
      scope: {
        card: '='
      }
    };
    return directive;

  }
})();
