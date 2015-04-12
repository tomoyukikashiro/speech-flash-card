(function() {

  'use strict';

  angular.module('common.router.book', [])
    .factory('CommonRouterBook', ['$location', '$routeParams', function($location, $routeParams) {

      var path = '#/books/';

      function getCreate() {
        return path + 'create';
      }

      function getList() {
        return path;
      }

      // export
      return {
        getCreate: getCreate,
        getList: getList
      };

    }]);

})();
