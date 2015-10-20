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
      save: save,
      update: update,
      getBook: getBook,

      isTooManyBook: isTooManyBook
    };

    ///
    function isTooManyBook(errors) {
      return errors && errors.indexOf('tmb') !== -1;
    }
    function update(id, data) {
      var dfd = $q.defer();
      resource.update({bookId: id}, {book: data})
        .$promise
        .then(function() {
          updateItem(id, data);
          dfd.resolve();
        });
      return dfd.promise;
    }
    function save(param) {
      var dfd = $q.defer();
      resource.save({}, param, function(response) {
        data.push(response);
        dfd.resolve(response);
      },function(response) {
        dfd.reject(response);
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
          data = res ? res.list : [];
          dfd.resolve(data);
        });
      return dfd.promise;
    }
    function getBook(id) {
      var res;
      angular.forEach(data, function(v) {
        if(v.id === id){
          res = v;
        }
      });
      return res;
    }
    function updateItem(id, target) {
      angular.forEach(data, function(v) {
        if(v.id === id){
          v.name = target.name;
          v.voices = {name: target.voices.name, lang: target.voices.lang};
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
