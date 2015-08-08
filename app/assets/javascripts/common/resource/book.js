(function() {
  'use strict';

  angular
    .module('common.resource.book', ['ngResource'])
    .factory('CommonResourceBook', CommonResourceBook);

  CommonResourceBook.$inject = ['$resource', '$q'];

  function CommonResourceBook($resource, $q) {
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
    function update(id, name) {
      var dfd = $q.defer();
      resource.update({bookId: id}, {name: name})
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
          data = res.list;
          dfd.resolve(res.list);
        });
      return dfd.promise;
    }
    function updateItem(id, name) {
      angular.forEach(data, function(v) {
        if(v.id === id){
          v.name = name;
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
