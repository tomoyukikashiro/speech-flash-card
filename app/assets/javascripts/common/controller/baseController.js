(function() {
  'use strict';

  /**
   * return object will extend controller instance
   */
  angular
    .module('common.controller.base', [
      'common.router.book',
      'common.router.card',
      'common.service.sideNav'
    ])
    .factory('CommonControllerBaseController', CommonControllerBaseController);

  CommonControllerBaseController.$inject = ['CommonRouterBook', 'CommonRouterCard', 'CommonServiceSideNav'];

  function CommonControllerBaseController(CommonRouterBook, CommonRouterCard, CommonServiceSideNav) {

    return {
      routers:{
        card: CommonRouterCard,
        book: CommonRouterBook
      },
      sideNav: CommonServiceSideNav
    };

  }
})();
