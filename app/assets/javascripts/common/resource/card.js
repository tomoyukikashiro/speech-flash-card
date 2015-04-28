(function() {
  'use strict';

  angular
    .module('common.resource.card', ['ngResource'])
    .factory('CommonResourceCard', CommonResourceCard);

  CommonResourceCard.$inject = ['$resource', '$q', '$routeParams', '$cacheFactory'];

  function CommonResourceCard($resource, $q, $routeParams, $cacheFactory) {
    var cache = $cacheFactory('cardList');
    var resource = $resource('/books/:bookId/cards/:cardId', {bookId: '@bookId', cardId: '@cardId'}, {
          get: {cache: cache}
        });

    function getAll(isReload) {
      if(isReload){
        cache.removeAll();
      }
      return resource.get({bookId: $routeParams.bookId}).$promise;
    }

    function getCard(bookId, cardId) {
      var dfd = $q.defer();
      resource.get({bookId: bookId}, function(response) {
        angular.forEach(response.list, function(card) {
          if(card.id === cardId){
            dfd.resolve(card);
          }
        });
        dfd.reject();
      });
      return dfd.promise;
    }

    return {
      resource: resource,
      getCard: getCard,
      getAll: getAll
    };
  }

})();
