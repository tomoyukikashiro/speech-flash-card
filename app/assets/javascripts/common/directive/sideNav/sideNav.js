(function() {
  'use strict';

  angular
    .module('SpeechFlashCard')
    .directive('sideNav', sideNav);

  function sideNav() {
    var directive = {
      restrict: 'E',
      controller: 'sideNavController',
      controllerAs: 'sideNav',
      templateUrl: 'templates/common/directive/sideNav.html',
      replace: true
    };
    return directive;
  }
})();
