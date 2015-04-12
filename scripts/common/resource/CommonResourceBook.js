(function() {

  'use strict';

  angular.module('common.resource.book', ['ngResource'])
    .factory('CommonResourceBook', ['$resource', '$cacheFactory', function($resource, $cacheFactory) {

      var cache = $cacheFactory('bookList');
      var resource = $resource('//localhost:3000/api/books/:id', {}, {
            get: {cache: cache}
          });
      return {
        resource: resource
      };

    }]);

})();
