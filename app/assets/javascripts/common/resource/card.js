(function() {
  'use strict';

  angular
    .module('common.resource.card', ['ngResource'])
    .factory('CommonResourceCard', CommonResourceCard);

  CommonResourceCard.$inject = ['$resource', '$q', '$routeParams'];

  function CommonResourceCard($resource, $q, $routeParams) {
    var resource = $resource('/api/books/:bookId/cards/:cardId', {bookId: '@bookId', cardId: '@cardId'});

    function getAll() {
      return resource.get({bookId: $routeParams.bookId}).$promise;
    }

    return {
      resource: resource,
      getAll: getAll
    };
  }

})();
