(function() {
  'use strict';

  angular
    .module('common.resource.card', ['ngResource'])
    .factory('CommonResourceCard', CommonResourceCard);

  CommonResourceCard.$inject = ['$resource', '$q', '$routeParams', '$route'];

  function CommonResourceCard($resource, $q, $routeParams, $route) {
    var resource = $resource('/api/books/:bookId/cards/:cardId', {bookId: '@bookId', cardId: '@cardId'});

    function getList() {
      var dfd = $q.defer(),
          bookId = $routeParams.bookId || $route.current.params.bookId;
      resource.get({bookId: bookId})
      .$promise
      .then(function(res) {
        dfd.resolve(res.list);
      });
      return dfd.promise;
    }

    return {
      resource: resource,
      getList: getList
    };
  }

})();
