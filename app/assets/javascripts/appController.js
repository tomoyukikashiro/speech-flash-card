(function() {
  'use strict';

  angular
    .module('app', [
      'common.controller.base'
    ])
    .controller('appController', appController);

  appController.$inject = ['CommonControllerBaseController'];

  function appController(CommonControllerBaseController) {
    angular.extend(this, CommonControllerBaseController);
  }
})();
