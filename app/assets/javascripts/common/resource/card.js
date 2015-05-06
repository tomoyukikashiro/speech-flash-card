(function() {
  'use strict';

  angular
    .module('common.resource.card', ['ngResource'])
    .factory('CommonResourceCard', CommonResourceCard);

  CommonResourceCard.$inject = ['$resource', '$q', '$routeParams', '$route'];

  function CommonResourceCard($resource, $q, $routeParams, $route) {
    var resource = $resource('/api/books/:bookId/cards/:cardId', {bookId: '@bookId', cardId: '@cardId'}),
        list;

    return {
      resource: resource,
      getList: getList,
      getCard: getCard,
      getIterator: getIterator
    };

    ///
    function getCurrentIndex(card) {
      if(angular.isUndefined(list)){
        return;
      }
      var hitIndex;
      angular.forEach(list, function(target, i) {
        if(target.id === card.id){
          hitIndex = i;
        }
      });
      return hitIndex;
    }
    function getIterator(currentCard) {
      var index = getCurrentIndex(currentCard);
      var iterator = {
        hasNext: undefined,
        hasPrev: undefined,
        updateHas: updateHas,
        getNext: getNext,
        getPrev: getPrev
      };
      iterator.updateHas();
      return iterator;
      function _hasNext() {
        return !(angular.isUndefined(list) || index === list.length -1);
      }
      function _hasPrev() {
        return !(angular.isUndefined(list) || index === 0);
      }
      function updateHas() {
        this.hasNext = _hasNext();
        this.hasPrev = _hasPrev();
      }
      function getPrev() {
        if(!_hasPrev()){
          return;
        }
        var prev = list[--index];
        this.updateHas();
        return prev;
      }
      function getNext() {
        if(!_hasNext()){
          return;
        }
        var next = list[++index];
        this.updateHas();
        return next;
      }
    }
    function getCard() {
      var listDfd = getList(),
          dfd = $q.defer(),
          cardId = $route.current.params.cardId,
          isHit = false;
      listDfd.then(function(list) {
        angular.forEach(list, function(card) {
          if(card.id === cardId){
            isHit = true;
            dfd.resolve(card);
          }
        });
        if(!isHit){
          dfd.reject();
        }
      }, function() {
        dfd.reject();
      });
      return dfd.promise;
    }
    function getList() {
      var dfd = $q.defer(),
          bookId = $route.current.params.bookId;
      if(!angular.isUndefined(list)){
        dfd.resolve(list);
        return dfd.promise;
      }
      resource.get({bookId: bookId})
      .$promise
      .then(function(res) {
        list = res.list;
        dfd.resolve(list);
      },function() {
        dfd.reject();
      });
      return dfd.promise;
    }
  }

})();
