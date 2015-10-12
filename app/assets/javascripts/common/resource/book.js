(function() {
  'use strict';

  angular
    .module('EnglishFlashCard')
    .factory('resourceBook', resourceBook);

  resourceBook.$inject = ['$resource', '$q'];

  function resourceBook($resource, $q) {
    var resource = $resource('/api/books/:bookId', {bookId: '@bookId'}, {
      'update': {method: 'PUT'}
    });
    var data = [];
    return {
      resource: resource,
      getList: getList,
      remove: remove,
      update: update
    };

    ///
    function update(id, data) {
      var dfd = $q.defer();
      resource.update({bookId: id}, {book: data})
        .$promise
        .then(function() {
          updateItem(id, name);
          dfd.resolve();
        });
      return dfd.promise;
    }
    function remove(id) {
      var dfd = $q.defer();
      resource.remove({bookId: id})
        .$promise
        .then(function() {
          removeItem(id);
          dfd.resolve();
        });
      return dfd.promise;
    }
    function getList() {
      var dfd = $q.defer();
      resource.get()
        .$promise
        .then(function(res) {
          data = res ? res.list : null;
          dfd.resolve(data);
        });
      return dfd.promise;
    }
    function updateItem(id, data) {
      angular.forEach(data, function(v) {
        if(v.id === id){
          v.name = data.name;
          v.voices = {name: data.voices.name, lang: data.voices.lang}
        }
      });
    }
    function removeItem(id) {
      angular.forEach(data, function(v, i) {
        if(v.id === id){
          data.splice(i, 1);
        }
      });
    }
  }

})();
