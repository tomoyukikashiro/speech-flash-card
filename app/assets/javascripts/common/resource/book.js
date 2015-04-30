(function() {
  'use strict';

  angular
    .module('common.resource.book', ['ngResource'])
    .factory('CommonResourceBook', CommonResourceBook);

  CommonResourceBook.$inject = ['$resource'];

  function CommonResourceBook($resource) {
    var resource = $resource('/api//books/:bookId', {bookId: '@bookId'});
    return {
      resource: resource
    };
  }

})();
