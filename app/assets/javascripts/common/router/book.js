(function() {
  'use strict';

  angular
    .module('common.router.book', [])
    .factory('CommonRouterBook', CommonRouterBook);

  CommonRouterBook.$inject = ['$location'];

  function CommonRouterBook($location) {
    var path = '/books/';

    function goList() {
      $location.path(path);
    }
    function getList() {
      return path;
    }

    // export
    return {
      goList: goList,
      getList: getList
    };
  }
})();
