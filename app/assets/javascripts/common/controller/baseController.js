(function() {
  'use strict';

  /**
   * return object will extend controller instance
   */
  angular
    .module('EnglishFlashCard')
    .factory('baseController', baseController);

  baseController.$inject = ['$rootScope', '$location', 'routerBook', 'routerCard', 'sideNav', 'APP_CONFIG'];

  function baseController($rootScope, $location, routerBook, routerCard, sideNav, APP_CONFIG) {

    return {
      routers:{
        card: routerCard,
        book: routerBook
      },
      sideNav: sideNav,
      pageChange: pageChange,
      APP_CONFIG : APP_CONFIG
    };

    function pageChange(name) {
      $rootScope.$emit('pagechange', {name: name});
    }

  }
})();
