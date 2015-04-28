(function() {
  'use strict';

  angular
    .module('common.resource.book', ['ngResource'])
    .factory('CommonResourceBook', CommonResourceBook);

  CommonResourceBook.$inject = ['$resource', '$cacheFactory'];

  function CommonResourceBook($resource, $cacheFactory) {
    var cache = $cacheFactory('bookList');
    var resource = $resource('/books/:bookId', {bookId: '@bookId'}, {
          get: {cache: cache, isArray: true}
        });
    return {
      resource: resource
    };
  }

})();
