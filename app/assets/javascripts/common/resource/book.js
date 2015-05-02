(function() {
  'use strict';

  angular
    .module('common.resource.book', ['ngResource'])
    .factory('CommonResourceBook', CommonResourceBook);

  CommonResourceBook.$inject = ['$resource', '$q'];

  function CommonResourceBook($resource, $q) {
    var resource = $resource('/api/books/:bookId', {bookId: '@bookId'});
    return {
      resource: resource,
      getList: getList
    };

    ///
    function getList() {
      var dfd = $q.defer();
      resource.get()
        .$promise
        .then(function(res) {
          dfd.resolve(res.list);
        });
      return dfd.promise;
    }
  }

})();
