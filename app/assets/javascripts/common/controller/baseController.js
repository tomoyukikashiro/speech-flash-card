(function() {
  'use strict';

  /**
   * return object will extend controller instance
   */
  angular
    .module('common.controller.base', [
      'common.router.book',
      'common.router.card',
    ])
    .factory('CommonControllerBaseController', CommonControllerBaseController);

  CommonControllerBaseController.$inject = ['CommonRouterBook', 'CommonRouterCard'];

  function CommonControllerBaseController(CommonRouterBook, CommonRouterCard) {

    return {
      routers:{
        card: CommonRouterCard,
        book: CommonRouterBook
      }
    };

  }
})();
