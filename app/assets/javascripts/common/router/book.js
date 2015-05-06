(function() {
  'use strict';

  angular
    .module('common.router.book', [])
    .factory('CommonRouterBook', CommonRouterBook);

  CommonRouterBook.$inject = ['$location'];

  function CommonRouterBook($location) {
    var path = '#/books/';

    function getList() {
      return path;
    }

    function goList() {
      $location.path(getList().substring(1));
    }

    // export
    return {
      getList: getList,
      goList: goList
    };
  }
})();
