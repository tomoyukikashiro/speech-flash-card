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

  CommonControllerBaseController.$inject = ['$rootScope', 'CommonRouterBook', 'CommonRouterCard', 'CommonServiceSideNav', 'APP_CONFIG'];

  function CommonControllerBaseController($rootScope, CommonRouterBook, CommonRouterCard, CommonServiceSideNav, APP_CONFIG) {

    return {
      routers:{
        card: CommonRouterCard,
        book: CommonRouterBook
      },
      sideNav: CommonServiceSideNav,
      pageChange: pageChange,
      APP_CONFIG : APP_CONFIG
    };

    function pageChange(name) {
      $rootScope.$emit('pagechange', {name: name});
    }

  }
})();
