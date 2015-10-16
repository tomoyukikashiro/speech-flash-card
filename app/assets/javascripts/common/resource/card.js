(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .factory('resourceCard', resourceCard);

  resourceCard.$inject = ['$resource', '$q', '$routeParams', '$route'];

  function resourceCard($resource, $q, $routeParams, $route) {
    var resource = $resource('/api/books/:bookId/cards/:cardId', {bookId: '@bookId', cardId: '@cardId'}, { update: {method: 'PUT'}}),
        list = {},
        iterator;

    return {
      resource: resource,
      getList: getList,
      getCard: getCard,
      getIterator: getIterator,
      remove: remove,
      update: update,
      save: save,

      isTooManyCard: isTooManyCard
    };

    ///
    function isTooManyCard(errors) {
      return errors && errors.indexOf('tmc') !== -1
    }
    function update(params, data) {
      var dfd = $q.defer();
      resource.update(params, data)
        .$promise
        .then(function() {
          updateItem(params.cardId, data);
          dfd.resolve();
        });
      return dfd.promise;
    }
    function remove(params) {
      var dfd = $q.defer();
      resource.remove(params)
        .$promise
        .then(function() {
          removeItem(params.cardId);
          dfd.resolve();
        });
      return dfd.promise;
    }
    function save(params, postData) {
      var dfd = $q.defer();
      resource.save(params, postData)
        .$promise
        .then(function(data) {
          list.data.push(data);
          dfd.resolve(list.data);
        }, function (data) {
          dfd.reject(data);
        });
      return dfd.promise;
    }


    function getCurrentIndex(card) {
      if(angular.isUndefined(list.data)){
        return;
      }
      var hitIndex;
      angular.forEach(list.data, function(target, i) {
        if(target.id === card.id){
          hitIndex = i;
        }
      });
      return hitIndex;
    }
    function getIterator(currentCard) {
      if(angular.isDefined(iterator)){
        iterator.updateHas();
        return iterator;
      }
      var _list = list.data;
      var index = getCurrentIndex(currentCard);
      iterator = {
        hasNext: undefined,
        hasPrev: undefined,
        updateHas: updateHas,
        getNext: getNext,
        getPrev: getPrev
      };
      iterator.updateHas();
      return iterator;
      function _hasNext() {
        return !angular.isUndefined(_list) && index !== _list.length -1;
      }
      function _hasPrev() {
        return !angular.isUndefined(_list) && index !== 0;
      }
      function updateHas() {
        _list = list.data;
        this.hasNext = _hasNext();
        this.hasPrev = _hasPrev();
      }
      function getPrev() {
        if(!_hasPrev()){
          return;
        }
        var prev = _list[--index];
        this.updateHas();
        return prev;
      }
      function getNext() {
        if(!_hasNext()){
          return;
        }
        var next = _list[++index];
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
      if(!angular.isUndefined(list.data) && list.id === bookId){
        dfd.resolve(list.data);
        return dfd.promise;
      }
      resource.get({bookId: bookId})
      .$promise
      .then(function(res) {
        list = {
          data: res.list,
          id: bookId
        };
        dfd.resolve(list.data);
      },function() {
        dfd.reject();
      });
      return dfd.promise;
    }
    function updateItem(id, data) {
      angular.forEach(list.data, function(v) {
        if(v.id === id){
          v.text = data.text;
          v.note = data.note;
        }
      });
      iterator.updateHas();
    }
    function removeItem(id) {
      angular.forEach(list.data, function(v, i) {
        if(v.id === id){
          list.data.splice(i, 1);
        }
      });
      iterator.updateHas();
    }

  }

})();
