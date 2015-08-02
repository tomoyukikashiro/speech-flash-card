(function() {
  'use strict';

  angular
    .module('common.directive.sideNav', [
      'common.resource.session',
      'ngMaterial'
    ])
    .directive('sideNav', SideNav);

  function SideNav() {
    var directive = {
      restrict: 'E',
      controller: 'CommonServiceSideNavController',
      controllerAs: 'sideNav',
      templateUrl: 'templates/common/directive/sideNav.html'
    };
    return directive;
  }
})();
